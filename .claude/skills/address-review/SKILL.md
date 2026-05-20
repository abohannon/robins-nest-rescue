---
name: address-review
description: Use when the user invokes `/address-review [<PR#>]` or asks to address review comments on a Robin's Nest Rescue PR. Fetches unresolved review threads + non-empty review bodies, plans a response with explicit disagreements, pauses once for user approval, then executes fixes, pushes, and posts replies on each addressed thread. Does not modify the Project board and does not resolve threads.
---

# `/address-review` — Address review feedback on one PR

## At a glance

Nine phases (a pre-flight + eight work phases). **One** user pause (the Phase 5 checkpoint between planning and execution). Everything else runs end-to-end.

0. **Pre-flight** — verify `gh` has the `repo` scope
1. **Fetch** the PR (number, title, branch, URL)
2. **Workspace** — reuse `.claude/worktrees/<type>-<slug>/` if it exists; else switch the main checkout to the PR branch
3. **Fetch unresolved comments** via GraphQL — inline threads + non-empty review bodies newer than the head branch's latest commit
4. **Plan + identify disagreements** — one-line intent per thread; group into logical commits; list "Will NOT change" items
5. **Checkpoint** — present plan + disagreements; wait for `yes` / `changes` / `abort`
6. **Execute** via `superpowers:executing-plans`, then verify (lint, format:check, test, build)
7. **Push + reply on threads** — `git push`, then post a reply on each addressed thread referencing the fix commit
8. **Handoff** — print PR URL, counts of addressed/won't-change/outdated threads, manual UI verification flag

After running, review the agent's replies on the PR, resolve threads when satisfied, then re-request review or merge.

## Arguments

`[<PR#>]` (optional) — integer or full PR URL.

- If omitted, auto-detect via `gh pr view --json number,headRefName` on the current branch.
- If a URL is given, extract the trailing integer.
- If neither works (no PR for the current branch and no arg), exit with: `no PR for branch <X>. Pass a PR number or check out the PR branch first.`

There is **no `--autonomous` mode**. Addressing review is inherently human-in-the-loop; the Phase 5 checkpoint is the whole point.

## Phase 0 — Pre-flight (run before anything else)

The skill needs `repo` scope for review-thread access and reply posting. It does **not** need `project` scope — the Project board is untouched.

```bash
gh auth status 2>&1 | grep -q "'repo'"
```

If that exits non-zero, tell the user:

```
This skill needs the GitHub `repo` scope.
Run: gh auth refresh -s repo
```

…and stop. Do not run Phase 1.

## Phase 1 — Fetch the PR

Resolve `<PR>` from the argument or from the current branch:

```bash
if [ -n "$ARG_PR" ]; then
  PR="$ARG_PR"
else
  PR=$(gh pr view --json number --jq .number 2>/dev/null)
fi

if [ -z "$PR" ]; then
  echo "no PR for branch $(git rev-parse --abbrev-ref HEAD). Pass a PR number or check out the PR branch first." >&2
  exit 1
fi
```

If a full URL was passed (e.g. `https://github.com/abohannon/robins-nest-rescue/pull/42`), extract the trailing integer before setting `ARG_PR`.

Fetch the PR metadata:

```bash
gh pr view "$PR" --json number,title,headRefName,baseRefName,url,state,mergeStateStatus
```

Capture and remember:

- `number` — used everywhere
- `title` — for handoff message
- `headRefName` — the branch to check out / mount as a worktree
- `url` — printed in the handoff
- `state` — if not `OPEN`, warn and ask whether to continue (closed/merged PRs can still take follow-up commits)

Also set the repo owner and name for later API calls (stable for this project — `gh repo view --json owner,name --jq '.owner.login + "/" + .name'` confirms):

```bash
OWNER=abohannon
REPO=robins-nest-rescue
```

`$OWNER` and `$REPO` are referenced in Phase 3's GraphQL query and Phase 7b's reply POSTs.

## Phase 2 — Enter workspace

The PR's branch is `headRefName`. Derive the worktree path by replacing `/` with `-` (matches `/do-ready-issues`' naming):

```bash
WORKTREE_PATH=".claude/worktrees/$(echo "$HEAD_REF" | sed 's|/|-|g')"
```

If the worktree directory exists, cd into it and pull. If not, switch the main checkout to the branch:

```bash
if [ -d "$WORKTREE_PATH" ]; then
  cd "$WORKTREE_PATH"
  CURRENT=$(git rev-parse --abbrev-ref HEAD)
  if [ "$CURRENT" != "$HEAD_REF" ]; then
    echo "Worktree at $WORKTREE_PATH is on $CURRENT, expected $HEAD_REF. Aborting." >&2
    exit 1
  fi
  git pull --ff-only
else
  if [ -n "$(git status --porcelain)" ]; then
    echo "Main checkout has uncommitted changes. Stash or commit before re-running /address-review." >&2
    exit 1
  fi
  git fetch origin
  git checkout "$HEAD_REF"
  git pull --ff-only
fi
```

If the worktree exists but is on the wrong branch, **abort** — do not auto-fix. The worktree may contain in-progress work from a different ticket.

## Phase 3 — Fetch unresolved comments

One GraphQL round-trip returns inline review threads and review submissions:

```bash
gh api graphql -f query='
  query($owner: String!, $repo: String!, $pr: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $pr) {
        author { login }
        reviewThreads(first: 100) {
          nodes {
            id
            isResolved
            isOutdated
            path
            line
            diffSide
            comments(first: 20) {
              nodes {
                id
                databaseId
                author { login }
                body
                url
                createdAt
              }
            }
          }
        }
        reviews(first: 50) {
          nodes {
            id
            state
            body
            author { login }
            submittedAt
            url
          }
        }
      }
    }
  }' -f owner="$OWNER" -f repo="$REPO" -F pr="$PR"
```

### Filtering rules

- Drop threads where `isResolved == true`.
- Do **not** filter by author. On this project the PR author and reviewer are the same GitHub identity — filtering by author would drop all feedback.
- Keep `isOutdated` threads but mark them with an `[OUTDATED]` flag (handled explicitly in Phase 4).
- For `reviews`: keep only entries whose `body` is non-empty **and** whose `submittedAt` is newer than the head branch's latest commit timestamp. Inline threads use `isResolved` for the same purpose; review bodies have no resolution mechanism on GitHub, so timestamp is the next-best proxy.

Head-branch latest commit timestamp:

```bash
LATEST_COMMIT_AT=$(git log -1 --format=%cI "origin/$HEAD_REF")
```

The `databaseId` on each thread's top comment is required for posting replies in Phase 7 (the reply REST endpoint takes the integer ID, not the GraphQL node ID). Capture it.

If after filtering there are zero items, exit cleanly:

```
No unresolved review threads on PR #<N>. Nothing to do.
```

Do not proceed to Phase 4.

## Phase 4 — Plan and identify disagreements

### Outdated-thread resolution check

For every thread flagged `[OUTDATED]` in Phase 3, before planning a code change, check whether the suggested change is already present:

1. Read the file at `thread.path`.
2. Compare the current content (around `thread.line` if still valid, or by semantic search if the line shifted) against the comment's request.
3. If the change is already in the file: mark the entry as "reply only", find the commit that introduced it, and capture that SHA for the Phase 7b reply. Useful commands:

   ```bash
   git log -p -- <path> | head -200
   # or, if you can identify a unique string from the change:
   git log --diff-filter=A -S '<unique snippet>' -- <path>
   ```

4. If the change is not present: process as a normal thread — the `[OUTDATED]` flag just means line numbers shifted; the request still applies.

If the agent cannot confidently determine whether an outdated thread is already addressed, treat it as **not addressed** and plan a normal code change. False-positive replies ("already addressed in <sha>") are harder to recover from than redundant work.

### Plan entries

For each kept thread or review body, produce a structured entry. Example:

```
T1  src/components/DonateForm.astro:42
    "Can we use the existing <Button> component here instead of raw <button>?"
    → Replace <button> with shared <Button variant="primary"> at line 42.
    Commit group: A

T2  src/lib/sanity.ts:88  [OUTDATED]
    "This query is missing the 'image' field"
    → Already addressed in commit a1b2c3d (image field present at line 91).
      Reply only, no code change.
    Commit group: — (reply only)

T3  REVIEW BODY
    "Overall looks good, but please add a loading state to the donate button."
    → Add aria-busy + spinner to DonateForm submit during fetch.
    Commit group: A
```

Each entry needs:

- A short ID (`T1`, `T2`, …) — used at the checkpoint for "skip T3" edits
- File + line (or `REVIEW BODY` for non-inline)
- The comment text in quotes
- A `→` line stating the intent (what the agent will do, or "reply only")
- A commit group letter (`A`, `B`, `C`, …) or `— (reply only)`

### Commit grouping rules

Group entries to minimize commits while keeping each commit one logical change (per `CLAUDE.md`):

- Same file + related concern → same group.
- Different files but one logical change (e.g. adding a loading state across a form + button) → same group.
- Different concerns in the same file → separate groups.
- Aim for the minimum number of commits that still satisfies "one logical change per commit".

Each group produces one conventional-commits commit at execute time. Example commit message for group A above:

```
fix(donate-form): use shared Button component and add loading state

Replaces raw <button> with <Button variant="primary"> and adds aria-busy +
spinner during submit, per review feedback.
```

### Disagreements ("Will NOT change")

Some comments the agent should not silently apply — e.g. the suggested change would break the architecture, contradicts the project's conventions, or is already addressed differently. Render these as a separate block in the checkpoint:

```
WILL NOT CHANGE
T5  src/pages/index.astro:12
    "Use useEffect to fetch tour dates on mount"
    → Reason: this is a static Astro page (server-rendered). useEffect would
      force a React island unnecessarily. Suggest fetching at build time via
      the Sanity client.
```

The user can override at the checkpoint with a `changes` reply ("apply T5 anyway"). The reason text becomes the body of the Phase 7b reply posted to the thread.

## Phase 5 — Checkpoint

**This is the only user pause in the skill.** Once the user says `yes`, Phases 6–8 run continuously.

Present this message to the user, exactly:

```
**PR:** #<N> — <title>
**Branch:** <headRefName>
**Threads addressed:** <m>
**Threads marked won't-change:** <k>
**Outdated threads acknowledged:** <j>

**Plan:**
<rendered Phase 4 entries grouped by commit>

**Will NOT change:**
<rendered disagreement entries>

Proceed? (yes / changes / abort)
```

Response handling:

- `yes` → continue to Phase 6.
- `changes` → take the user's edits (e.g. "skip T3", "change T5 reason to X", "merge group A and B"), revise the plan, re-present the checkpoint. Loop until `yes` or `abort`.
- `abort` → leave the worktree/branch as-is. No commits, no push, no replies. Exit cleanly with a one-line note.
