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
