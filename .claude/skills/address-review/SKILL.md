---
name: address-review
description: Use when the user invokes `/address-review [<PR#>]` or asks to address review comments on a Robin's Nest Rescue PR. Fetches unresolved review threads, non-empty review bodies, and issue-level PR comments, plans a response with explicit disagreements, pauses once for user approval, then executes fixes, pushes, and posts replies on each addressed thread/comment. Does not modify the Project board and does not resolve threads.
---

# `/address-review` — Address review feedback on one PR

## At a glance

Nine phases (a pre-flight + eight work phases). **One** user pause (the Phase 5 checkpoint between planning and execution). Everything else runs end-to-end.

0. **Pre-flight** — verify `gh` has the `repo` scope
1. **Fetch** the PR (number, title, branch, URL)
2. **Workspace** — reuse `.claude/worktrees/<type>-<slug>/` if it exists; else switch the main checkout to the PR branch
3. **Fetch unresolved comments** via GraphQL — inline threads + non-empty review bodies + issue-level PR comments newer than the head branch's latest commit (bot authors filtered out)
4. **Plan + identify disagreements** — one-line intent per thread; group into logical commits; list "Will NOT change" items
5. **Checkpoint** — present plan + disagreements; wait for `yes` / `changes` / `abort`
6. **Execute** via `superpowers:executing-plans`, then verify (lint, format:check, test, build)
7. **Push + reply** — `git push`, then post a reply on each addressed thread / review body / issue comment referencing the fix commit
8. **Handoff** — print PR URL, counts of addressed/won't-change/outdated items, manual UI verification flag

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

One GraphQL round-trip returns inline review threads, review submissions, **and** issue-level PR comments. All three are feedback channels on this project — Adam sometimes submits a formal review, sometimes types a plain PR comment. Missing the issue-comment channel means missing real feedback (this happened on PR #57).

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
        comments(first: 100) {
          nodes {
            id
            databaseId
            author { __typename login }
            body
            url
            createdAt
          }
        }
      }
    }
  }' -f owner="$OWNER" -f repo="$REPO" -F pr="$PR"
```

### Filtering rules

- **Inline `reviewThreads`:** drop where `isResolved == true`. Keep `isOutdated` threads but mark them `[OUTDATED]` (handled in Phase 4).
- **`reviews`:** keep only entries whose `body` is non-empty **and** whose `submittedAt` is newer than the head branch's latest commit timestamp. Review bodies have no resolution mechanism on GitHub, so timestamp is the next-best proxy.
- **`comments` (issue-level PR comments):** drop entries where `author.__typename == "Bot"` (cloudflare-workers-and-pages, dependabot, github-actions, etc. — these are deployment status and automation noise, never feedback). Note: GraphQL strips the `[bot]` suffix from bot logins, so checking `__typename` is the reliable filter (don't string-match on `[bot]`). Then keep only entries whose `createdAt` is newer than the head branch's latest commit timestamp — same staleness rule as review bodies.
- **Do not filter by author.** On this project the PR author and reviewer are the same GitHub identity — filtering by author would drop all feedback.

Head-branch latest commit timestamp:

```bash
LATEST_COMMIT_AT=$(git log -1 --format=%cI "origin/$HEAD_REF")
```

The `databaseId` on each inline thread's top comment is required for posting replies in Phase 7 (the reply REST endpoint takes the integer ID, not the GraphQL node ID). Issue-level comments don't support threaded replies — Phase 7b posts a fresh issue comment for those, no `databaseId` needed for the reply itself. Capture `databaseId` for inline threads and for issue-comment items (the latter is still useful for logging / handoff URLs).

If after filtering there are zero items across all three channels, exit cleanly:

```
No unresolved review threads, review bodies, or open PR comments on PR #<N>. Nothing to do.
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

For each kept thread, review body, or issue comment, produce a structured entry. Example:

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

T4  ISSUE COMMENT
    "Hero copy feels long; can we tighten the second sentence?"
    → Trim VideoHero subtext line 57 from two clauses to one.
    Commit group: B
```

Each entry needs:

- A short ID (`T1`, `T2`, …) — used at the checkpoint for "skip T3" edits
- One of: file + line (inline thread), `REVIEW BODY` (formal review), or `ISSUE COMMENT` (plain PR comment)
- The comment text in quotes
- A `→` line stating the intent (what the agent will do, or "reply only")
- A commit group letter (`A`, `B`, `C`, …) or `— (reply only)`

A single issue comment may bundle multiple asks (as Adam often does — one comment, three bullet points). Split it into separate plan entries (T4a, T4b, T4c) when the asks touch different files or different logical changes, so they can be grouped into commits independently. Use a single entry only when all asks are one logical change.

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
**Items addressed:** <m>          (threads + review bodies + issue comments)
**Items marked won't-change:** <k>
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

## Phase 6 — Execute and verify

Invoke `superpowers:executing-plans` with the locked plan from Phase 5. Each commit group becomes one plan task ending in a conventional-commits commit (per `CLAUDE.md`):

```
fix(<scope>): <imperative summary>

<body explaining why the change was made, referencing the review feedback>
```

After execution, run `superpowers:verification-before-completion` with these gates **in order**:

```bash
npm run lint
npm run format:check    # if it fails, run `npm run format` and re-run format:check
npm run test
npm run build
```

UI smoke (`npm run dev` + browser) is **optional** for `/address-review` — only run it if the comments touched user-visible UI. Mark the choice in the Phase 8 handoff:

- "Manual UI verification: performed" — agent confirmed in browser
- "Manual UI verification: recommended" — agent could not or did not

If any gate fails: fix the underlying issue and re-run that gate. Do not skip, do not pass `--no-verify`, do not push.

## Phase 7 — Push and reply

### 7a — Push

```bash
git push
```

No `-u` (the branch already tracks), no `--force`, no `--force-with-lease`. If the push is rejected (upstream diverged), abort with:

```
Push rejected — upstream has changes not in your local branch.
Rebase manually (git pull --rebase, resolve any conflicts) and re-run /address-review.
```

Do not attempt to rebase autonomously. Local code changes are already committed; the user can resolve and re-run cleanly.

Capture each new commit's SHA from `git log <previous-HEAD>..HEAD --format=%H` — Phase 7b uses these in the thread replies.

### 7b — Reply on threads

For each **inline** thread the agent addressed, post a reply via the REST API. The endpoint takes the **top comment's `databaseId`** (captured in Phase 3):

```bash
gh api -X POST \
  "repos/$OWNER/$REPO/pulls/$PR/comments/$TOP_COMMENT_DATABASE_ID/replies" \
  -f body="Addressed in $SHA — $ONE_LINE_SUMMARY."
```

Example body:

```
Addressed in a1b2c3d — replaced raw <button> with shared <Button variant="primary">.
```

For each **review-body** comment the agent addressed, post an issue comment (PRs share the issues endpoint for general comments):

```bash
gh api -X POST "repos/$OWNER/$REPO/issues/$PR/comments" \
  -f body="Re: review body — addressed in $SHA: $ONE_LINE_SUMMARY."
```

For each **issue-comment** entry the agent addressed (a plain PR comment), post a reply as a new issue comment on the same endpoint. If the original comment bundled multiple asks that became multiple plan entries (T4a, T4b, T4c), post **one** combined reply referencing all the fix commits — don't spam the thread with one comment per entry:

```bash
gh api -X POST "repos/$OWNER/$REPO/issues/$PR/comments" \
  -f body="Re: your comment — addressed in $SHA_A ($SUMMARY_A) and $SHA_B ($SUMMARY_B)."
```

For each **"Will NOT change"** thread, the user approved the reason at Phase 5 — post that reason as the reply:

```bash
gh api -X POST \
  "repos/$OWNER/$REPO/pulls/$PR/comments/$TOP_COMMENT_DATABASE_ID/replies" \
  -f body="Won't change — $REASON_FROM_PHASE_5."
```

For each **`[OUTDATED]` thread already addressed** in an earlier commit, point at that prior commit:

```bash
gh api -X POST \
  "repos/$OWNER/$REPO/pulls/$PR/comments/$TOP_COMMENT_DATABASE_ID/replies" \
  -f body="Addressed in $EARLIER_SHA — $FIELD_OR_CHANGE is now at $NEW_LOCATION."
```

**Do not resolve any threads.** Resolution is the user's manual step after spot-checking.

If a reply POST fails (e.g. `404` because the comment was deleted), log the failure into the Phase 8 handoff and **continue with remaining replies**. Do not abort — the code change already landed on the remote.

## Phase 8 — Handoff

Print to the user:

```
Done.

PR:     <pr_url>
Branch: <head_branch>
Commits pushed: <n>
Items addressed: <m>          (threads + review bodies + issue comments)
Items marked won't-change: <k>
Outdated threads acknowledged: <j>
Reply failures: <list of comment URLs, if any; "none" otherwise>

Manual UI verification: <performed / recommended>

Next: review the agent's replies on the PR, resolve threads when satisfied,
re-request review or merge.
```

The skill ends here.

## Error handling

| Condition                                              | Behavior                                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `gh` missing `repo` scope                              | Print `gh auth refresh -s repo`; exit before any work                                   |
| No `<PR#>` arg and current branch has no PR            | Exit with "no PR for branch \<X\>" message                                              |
| PR is closed or merged                                 | Warn; ask whether to continue                                                           |
| Worktree exists at expected path but on wrong branch   | Abort with a clear message; do not auto-fix                                             |
| Main checkout has uncommitted changes and no worktree  | Abort; ask user to stash or commit                                                      |
| Zero unresolved items found across all three channels  | Exit cleanly: "No unresolved review threads, review bodies, or open PR comments on PR #\<N\>. Nothing to do." |
| All threads are disagreements                          | Skip Phase 6 (no code to execute); go to Phase 7b for replies; handoff reflects this    |
| Verification gate fails                                | Fix the underlying issue and re-run; do not skip; do not `--no-verify`; do not push     |
| `git push` rejected                                    | Abort; tell user to rebase manually and re-run                                          |
| Thread reply POST fails                                | Log to handoff; continue with remaining replies; do not abort                           |
| User answers `abort` at Phase 5 checkpoint             | Leave worktree/branch untouched; exit cleanly                                           |
| User answers `changes` at Phase 5 checkpoint           | Take edits; re-present; loop until `yes` or `abort`                                     |
| `[OUTDATED]` thread already addressed                  | Plan as "reply only"; reply points at the earlier commit                                |

## Out of scope

For future-you reading this skill and wondering whether it should do these — it should not:

- The skill does **not** call `gh project item-edit`. The Project board stays at `In review` throughout. Status transitions are owned by `/do-issue`.
- The skill does **not** create or delete worktrees. It reuses existing ones from `/do-ready-issues` or operates in the main checkout.
- The skill does **not** request a re-review (`gh pr review`). The user decides when to re-request after spot-checking replies.
- The skill does **not** support multi-PR batch operation. One PR per invocation.
- The skill does **not** resolve threads. That is a deliberate human step.
