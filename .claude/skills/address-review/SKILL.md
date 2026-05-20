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
