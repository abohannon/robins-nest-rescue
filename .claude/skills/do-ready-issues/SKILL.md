---
name: do-ready-issues
description: Use when the user invokes `/do-ready-issues [<limit>]` or asks to process every Ready + agent-labeled + unblocked issue from the Robin's Nest Rescue Project board in parallel. Orchestrator only — per-ticket work is delegated to `/do-issue --autonomous` inside an isolated git worktree per ticket. Optional integer arg caps the number of tickets to dispatch (lowest issue numbers first).
---

# /do-ready-issues — Drive every eligible issue to a PR in parallel

## At a glance

`/do-ready-issues` is an orchestrator. It queries the Project board for candidates, filters by Status/label/blockers, pre-computes per-ticket inputs, dispatches one `Agent` subagent per candidate **in a single message** so they run in parallel, and prints a consolidated summary when all subagents return. Each subagent prepares its own worktree and runs `/do-issue <N> --autonomous` inside it.

There is **no user checkpoint** anywhere in this skill. Once dispatched, subagents run end-to-end and the GitHub PR review is the human-in-the-loop gate.

Workflow:

0. **Pre-flight** — verify `gh` has the `project` scope
1. **Query** Project items where Status = `Ready`, issue open, labels include `agent`
2. **Resolve** "Blocked by" relationships per candidate; drop those with open blockers
3. **Cap** candidates by `<limit>` arg if supplied (lowest issue numbers first)
4. **Echo** the dispatch plan to the user (informational, no prompt)
5. **Pre-compute** per-candidate inputs (branch type, slug, worktree name; PROJECT_ID once)
6. **Dispatch** all candidates in a single message containing N `Agent` tool calls
7. **Aggregate** the structured replies and print the final summary

## Argument

`<limit>` (optional integer) — cap the number of tickets dispatched this run. Candidates are ordered by issue number ascending and truncated to the first `<limit>`. Omit to dispatch all eligible candidates.

Examples:
- `/do-ready-issues` — dispatch every eligible ticket
- `/do-ready-issues 3` — dispatch the first three eligible tickets

## Project metadata (cached)

These IDs match the ones in `/do-issue` and are stable for the Robin's Nest Rescue Project. Do not re-discover them on every run.

- Project number: `1`
- Project owner: `abohannon`
- Status field ID: `PVTSSF_lAHOAA2SwM4BXZBHzhSmJ-o`
- Status option IDs:
  - `Backlog` → `f75ad846`
  - `Ready` → `61e4505c`
  - `In progress` → `47fc9ee4`
  - `In review` → `df73e18b`
  - `Done` → `98236657`

Fetch `PROJECT_ID` once per run (passed into every subagent prompt):

```bash
PROJECT_ID=$(gh project view 1 --owner abohannon --format json | jq -r .id)
```

## Phase 0 — Pre-flight (run before anything else)

Verify `gh` is authenticated with the `project` scope:

```bash
gh auth status 2>&1 | grep -q "'project'"
```

If that exits non-zero, tell the user:

```
This skill needs the GitHub `project` scope.
Run: gh auth refresh -s project
```

…and stop. Do not run Phase 1.

## Phase 1 — Query candidates

A single GraphQL call returns every Project item with its content (issue), labels, and Status field value:

````bash
gh api graphql -f query='
  query($owner: String!, $number: Int!) {
    user(login: $owner) {
      projectV2(number: $number) {
        items(first: 100) {
          nodes {
            id
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  field { ... on ProjectV2SingleSelectField { name } }
                  name
                }
              }
            }
            content {
              ... on Issue {
                number
                title
                state
                url
                labels(first: 20) { nodes { name } }
              }
            }
          }
        }
      }
    }
  }' -f owner=abohannon -F number=1
````

Filter the response in-memory. Keep an item iff **all** are true:

- `content.state == "OPEN"`
- Any element of `content.labels.nodes[].name` equals `agent`
- The single-select field with `field.name == "Status"` has `name == "Ready"`

For each kept item, remember: `id` (this is the `ITEM_ID` for later status updates), `content.number`, `content.title`, `content.url`, `content.labels`.

If zero items remain, skip ahead to Phase 4's "no candidates" echo and exit.

## Phase 2 — Resolve dependencies

For each candidate kept from Phase 1, look up issues that block it. GitHub's issue-dependencies feature exposes this via REST:

````bash
gh api repos/abohannon/robins-nest-rescue/issues/<N>/dependencies/blocked_by \
  --jq '.[] | {number, state}'
````

The response is a JSON array of `{number, state}` for each blocker. If the REST endpoint returns a 404 or the schema differs from the above, fall back to the GraphQL `trackedIssues` connection on `Issue`:

````bash
gh api graphql -f query='
  query($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
      issue(number: $number) {
        trackedIssues(first: 50) {
          nodes { number state }
        }
      }
    }
  }' -f owner=abohannon -f repo=robins-nest-rescue -F number=<N>
````

(`trackedIssues` returns issues this issue tracks/depends on; `trackedInIssues` is the inverse. The blocker direction is `trackedIssues`.)

**Verify the endpoint once before locking it in.** Pick a known-blocked test ticket and confirm the chosen endpoint returns its blocker. The blocker side of GitHub's relationship UI is what we want.

For each candidate, drop it from the dispatch set if **any** blocker has `state == "open"`. Record the reason (`blocked by open #<blocker>`) so it can be printed in Phase 4's echo.

## Phase 3 — Cap and pre-compute

### Cap

If `<limit>` was supplied, sort surviving candidates by issue number ascending and truncate to the first `<limit>`. Stable, predictable, no surprises.

### Pre-compute per-candidate inputs

For each surviving candidate, derive:

| Input         | How                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Branch type   | Use `/do-issue`'s label → type table. If no matching label exists, **drop the candidate** and record `ineligible (no branch-type label)`. The orchestrator never guesses. |
| Branch slug   | Kebab-case from the issue title, ≤4 meaningful words (drop stopwords `the`, `a`, `an`, `to`, `for`, `of`, `in`, `on`, `and`, `or`). Same rules as `/do-issue` Phase 2. |
| Worktree name | `<type>-<slug>` (replace `/` with `-` so the path has no nested directories)                    |

### Fetch `PROJECT_ID` once

```bash
PROJECT_ID=$(gh project view 1 --owner abohannon --format json | jq -r .id)
```

Keep `PROJECT_ID` in scope — every subagent prompt will include it as a pre-computed input.

## Phase 4 — Echo the dispatch plan

Print one message to the user. **There is no prompt** — this is informational only. The user has a `Ctrl-C` window before the dispatch message lands if they want to cancel.

Format:

```
Dispatching <D> ticket(s) in parallel:
  #<N> — <title>                                      <type>/<slug>
  ...

Skipping <B> blocked ticket(s):
  #<N> — <title> (blocked by open #<blocker>)
  ...

Skipping <I> ineligible ticket(s):
  #<N> — <title> (<reason, e.g. no branch-type label>)
  ...

No checkpoint will be requested. Subagents run autonomously to PR.
```

If `<D> == 0`, print only the "Skipping" lines and a closing one-liner:

```
No tickets to dispatch.
  Ready + agent + unblocked + branch-type-labeled: 0
```

…and exit. Do not proceed to Phase 5.

## Phase 5 — Dispatch

Emit **one message** containing one `Agent` tool call per candidate. The harness will run them in parallel because they are all in the same assistant turn. Do not spawn them sequentially across multiple messages — that would serialize the run.

Each `Agent` call:

- `description`: `"/do-issue #<N>"`
- `subagent_type`: `general-purpose`
- `isolation`: **omit** (the subagent creates its own worktree under the project convention — do not use the harness's `worktree` isolation, which would create an unrelated temp worktree on a generated branch)
- `prompt`: the contract below, with placeholders substituted to actual values

### Per-ticket subagent prompt

````
You are processing GitHub issue #<N> for the Robin's Nest Rescue project
in autonomous mode. There is no user to pause for. Drive this ticket
end-to-end: setup → /do-issue --autonomous → return a structured reply.

## Setup (do these FIRST, before invoking /do-issue)

1. From the project root, create your worktree on a fresh branch off
   origin/main:

     git -C /Users/adam.bohannon/Projects/robins-nest/web/robins-nest-rescue \
       fetch origin main
     git -C /Users/adam.bohannon/Projects/robins-nest/web/robins-nest-rescue \
       worktree add .claude/worktrees/<worktree-name>/ \
       -b <type>/<slug> origin/main

2. Symlink the env file into the worktree:

     ln -s /Users/adam.bohannon/Projects/robins-nest/web/robins-nest-rescue/.env \
           /Users/adam.bohannon/Projects/robins-nest/web/robins-nest-rescue/.claude/worktrees/<worktree-name>/.env

3. cd into the worktree. Every subsequent command runs from there.

4. Run `npm install`. The worktree starts with no node_modules.

## Then invoke /do-issue in autonomous mode

Run: /do-issue <N> --autonomous

## Pre-computed inputs (do not re-derive)

- Issue number:   <N>
- Issue title:    <title>
- Branch type:    <type>
- Branch slug:    <slug>
- Worktree name:  <worktree-name>
- PROJECT_ID:     <project_id>
- ITEM_ID:        <item_id>

## Report back

On success, return exactly:

  STATUS: success
  PR: <pr_url>
  ISSUE: #<N>
  WORKTREE: .claude/worktrees/<worktree-name>/

On failure (anywhere in setup or in /do-issue), return exactly:

  STATUS: failure
  ISSUE: #<N>
  PHASE: <which phase or step failed>
  ERROR: <one-line summary>
  WORKTREE: .claude/worktrees/<worktree-name>/   (left in place for manual resume)
  BRANCH: <type>/<slug>                          (not deleted)
````

The orchestrator session blocks until every subagent returns.

## Phase 6 — Aggregate and print the summary

Parse each subagent's reply. The first line should be `STATUS: success` or `STATUS: failure`. Bucket replies accordingly. A reply that matches neither is treated as failure with `ERROR: could not parse subagent reply` and the raw last 500 characters of the reply included in the summary for debugging.

Print one final consolidated message:

```
Done. Dispatched <D> ticket(s).

Succeeded (<S>):
  #<N> → <pr_url>
        <title>
  ...

Failed (<F>):
  #<N> — Phase <P>
        <error>
        Worktree: .claude/worktrees/<worktree-name>/
        Branch:   <type>/<slug>
        Resume:   cd .claude/worktrees/<worktree-name>/ && investigate
  ...

Skipped (<B> blocked):
  #<N> — blocked by open #<blocker>
  ...

Skipped (<I> ineligible):
  #<N> — <reason>
  ...

Re-run /do-ready-issues after merging unblocking PRs to pick up dependents.
```

Omit any bucket whose count is zero. The skill ends here.

## Error handling

| Condition                                              | Behavior                                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `gh` missing `project` scope                           | Print `gh auth refresh -s project` and exit before any query                          |
| GraphQL/REST query fails                               | Exit, surface the `gh` error verbatim, no dispatch                                    |
| Zero candidates after filter                           | Print one-line "nothing to do" with skip counts, exit cleanly                         |
| Candidate has no branch-type label                     | Drop from dispatch set; record as `ineligible (no branch-type label)`                 |
| Candidate has an open blocker                          | Drop from dispatch set; record as `blocked by open #<blocker>`                        |
| Subagent returns `STATUS: failure`                     | Aggregate into the final summary; sibling subagents continue                          |
| Subagent reply is malformed                            | Treat as failure with raw tail in summary                                             |
| User Ctrl-Cs during dispatch                           | Already-dispatched subagents continue in their own contexts (harness behavior)        |

The orchestrator **never** deletes worktrees or branches, **never** retries failed subagents, and **never** rolls back Project Status.

## Out of scope (deferred)

The following are explicit non-goals for this version:

- Wave-based dependency execution (re-run after blockers merge instead)
- Background (`run_in_background`) dispatch
- Auto-retry of failed subagents
- Auto-cleanup of merged worktrees (handled manually per existing memory)
- A `--dry-run` mode
- `node_modules` sharing across worktrees
- Per-subagent concurrency cap (user controls scope via labeling)
