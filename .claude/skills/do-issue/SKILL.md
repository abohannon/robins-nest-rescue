---
name: do-issue
description: Use when the user invokes `/do-issue <N>` or asks to work a specific GitHub issue from the Robin's Nest Rescue Project board (https://github.com/users/abohannon/projects/1). Accepts a bare issue number or full issue URL. Drives the ticket from Ready to a linked PR in `In review`, pausing once for user approval of the plan.
---

# /do-issue — Drive one GitHub issue to a PR

## At a glance

Eleven phases (a pre-flight + ten work phases). **One** user pause (the Phase 4 checkpoint between planning and execution). Everything else runs end-to-end.

0. **Pre-flight** — verify `gh` has the `project` scope
1. **Fetch** the issue
2. **Setup** — branch off `main`, Project Status → `In progress`
3. **Plan** via `superpowers:writing-plans` (issue body = spec)
4. **Checkpoint** — present plan + assumptions; wait for `yes` / `changes` / `abort`
5. **Execute** via `superpowers:executing-plans` (or `subagent-driven-development`)
6. **Verify** — lint, format, tests, build, manual UI smoke
7. **Commit** — conventional commits per `CLAUDE.md`
8. **PR** — `gh pr create` with `Closes #<N>`
9. **Status** → `In review`
10. **Handoff** — print PR URL, suggest `/clear` + next `/do-issue`

After `/clear`, run `/do-issue <next-N>` for the next ticket on the board.

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

## Argument

`<N>` — GitHub issue number or full issue URL (e.g. `12` or `https://github.com/abohannon/robins-nest-rescue/issues/12`).

If a URL is given, extract the trailing integer for use as `<N>` in `Closes #<N>` and any `gh api` queries. `gh issue view <URL>` accepts the URL directly.

## Project metadata (cached)

These IDs belong to the Robin's Nest Rescue Project (private, owner `abohannon`, number `1`). They are stable — do not re-discover them on every run.

- Project number: `1`
- Project owner: `abohannon`
- Status field ID: `PVTSSF_lAHOAA2SwM4BXZBHzhSmJ-o`
- Status option IDs:
  - `Backlog` → `f75ad846`
  - `Ready` → `61e4505c`
  - `In progress` → `47fc9ee4`
  - `In review` → `df73e18b`
  - `Done` → `98236657`

**Project ID** (needed for `gh project item-edit`, look up once per run):

```bash
PROJECT_ID=$(gh project view 1 --owner abohannon --format json | jq -r .id)
```

**Item ID** for a given issue number (look up once per run, after FETCH):

```bash
ITEM_ID=$(gh api graphql -f query='
  query($owner: String!, $number: Int!) {
    user(login: $owner) {
      projectV2(number: $number) {
        items(first: 100) {
          nodes { id content { ... on Issue { number } } }
        }
      }
    }
  }' -f owner=abohannon -F number=1 \
  | jq -r --argjson n <N> '.data.user.projectV2.items.nodes[] | select(.content.number == $n) | .id')
```

If `ITEM_ID` is empty, the issue is not on the Project board. Skip Status updates in Phase 2 and Phase 9 and continue.

## Verify a Status update

`gh project item-edit` has been observed to exit `0` without applying the change. **After every Status change, re-query the field and confirm the new value matches the expected value** — otherwise the board silently falls out of sync with the work.

```bash
STATUS=$(gh api graphql -f query='
  query($owner: String!, $number: Int!) {
    user(login: $owner) {
      projectV2(number: $number) {
        items(first: 100) {
          nodes {
            content { ... on Issue { number } }
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  field { ... on ProjectV2SingleSelectField { name } }
                  name
                }
              }
            }
          }
        }
      }
    }
  }' -f owner=abohannon -F number=1 \
  | jq -r --argjson n <N> '.data.user.projectV2.items.nodes[] | select(.content.number == $n) | .fieldValues.nodes[] | select(.field.name=="Status") | .name')
echo "$STATUS"
```

If `$STATUS` matches the expected value, continue. If not: re-run the same `gh project item-edit` command **once** and re-verify. If it still does not match, surface the failure to the user (current status, expected status, suggestion to set it manually on the board) — do not silently proceed.

## Phase 1 — Fetch the issue

Run:

```bash
gh issue view <N> --json number,title,body,labels,url
```

Capture and remember:

- `number` — for `Closes #<N>` and item-ID lookup
- `title` — for branch slug and PR title
- `body` — used as the spec input for Phase 3 (writing-plans)
- `labels[].name` — used to derive the branch type
- `url` — included in the handoff message
- The issue's current Project Status (read via the item-ID lookup above)

## Phase 2 — Setup (branch + status)

### Derive the branch type from labels

| Label                      | Branch type                              |
| -------------------------- | ---------------------------------------- |
| `enhancement` or `feature` | `feat`                                   |
| `bug`                      | `fix`                                    |
| `chore`                    | `chore`                                  |
| `refactor`                 | `refactor`                               |
| `docs`                     | `docs`                                   |
| (no matching label)        | ASK at Phase 4 checkpoint — do not guess |

### Generate the branch slug

Kebab-case from the issue title, at most **4 meaningful words** (drop common stopwords: `the`, `a`, `an`, `to`, `for`, `of`, `in`, `on`, `and`, `or`). Examples:

- "Add link to robinsnestramona.com" → `link-robinsnestramona`
- "Improve \"Book Tour\" page" → `improve-book-tour-page`
- "Add image gallery to Animal pages" → `animal-image-gallery`

Final branch name: `<type>/<slug>`.

### Create the branch

```bash
git checkout main && git pull && git checkout -b <type>/<slug>
```

If the branch already exists locally or on the remote: **abort**. Tell the user and stop. Do not delete or overwrite.

### Move Project Status: `Ready` → `In progress`

If `ITEM_ID` is non-empty:

```bash
gh project item-edit \
  --project-id "$PROJECT_ID" \
  --id "$ITEM_ID" \
  --field-id PVTSSF_lAHOAA2SwM4BXZBHzhSmJ-o \
  --single-select-option-id 47fc9ee4
```

Then **verify the update landed** using the [Verify a Status update](#verify-a-status-update) pattern. Expected value: `In progress`.

### Pre-flight status checks (warn before continuing)

- Current Status is `In progress` or `Done` → warn the user (work may already exist), ask whether to continue
- Current Status is `Backlog` → warn (issue isn't `Ready`), ask whether to continue
- Current Status is `Ready` → proceed silently

## Phase 3 — Plan

The issue body is the spec. There is **no brainstorming phase** in `/do-issue` — that decision was made upfront because the user writes tickets with enough detail to act on.

Invoke `superpowers:writing-plans` with the issue body as the spec input. As you write the plan, collect any **assumptions** you had to make to fill in ambiguity from the ticket (e.g. "I'm assuming this widget goes in the footer, not the header"). Track these — they go into the checkpoint message in Phase 4.

If the ticket is genuinely too thin to plan, do not invent requirements. Surface the gap at the Phase 4 checkpoint and let the user fill it in.

## Phase 4 — Checkpoint

**This is the only user pause in the skill.** Once the user says `yes`, Phases 5–10 run continuously.

Present this message to the user, exactly:

```
**Issue:** #<N> — <title>
**Branch:** <type>/<slug>
**Plan:**
<rendered plan from Phase 3>

**Assumptions:**
- <assumption 1>
- <assumption 2>
- ...

Proceed? (yes / changes / abort)
```

Response handling:

- `yes` → continue to Phase 5
- `changes` → take the user's edits, revise the plan, re-present the checkpoint. Loop until `yes` or `abort`.
- `abort` → **leave the branch in place** for manual resume. **Do not** delete the branch, do not roll back the Project Status. Exit cleanly with a one-line note explaining how to resume manually.

## Phase 5 — Execute

Invoke `superpowers:executing-plans` to work the plan task-by-task. Use `superpowers:subagent-driven-development` instead when the plan has multiple independent tasks that benefit from parallel execution.

Follow the project's `CLAUDE.md` conventions throughout:

- **Reuse over reinvention** — check for existing components before creating new ones
- Astro components for static content; React only for complex stateful UI
- Tailwind responsive prefixes; test mobile widths
- Semantic HTML + WCAG 2.1 accessibility
- Sanity queries co-located with consumers
- Atomic commits per plan task, conventional-commits format

## Phase 6 — Verify

Invoke `superpowers:verification-before-completion` and run these gates **in order**. All applicable gates must pass before opening the PR.

```bash
npm run lint            # ESLint
npm run format:check    # Prettier — if it fails, run `npm run format` to auto-fix
npm run test            # Vitest unit tests
npm run build           # Astro check + production build
```

For UI-touching changes, also run a manual smoke test:

```bash
npm run dev             # then open http://localhost:4321 in a browser
```

Exercise the **golden path** and the **specific change** introduced by the ticket. If you cannot run a browser yourself (no Playwright MCP or comparable tool available), **say so explicitly** in the PR test plan rather than claiming the UI works. Per project `CLAUDE.md`: "type checking and test suites verify code correctness, not feature correctness."

Run `npm run test:e2e` (Playwright) **only** when the change touches a flow with existing E2E coverage. Otherwise skip and note "no E2E coverage for this flow" in the PR.

**Failure handling:** if any gate fails, fix the underlying issue and re-run the gate. Do not skip. Do not pass `--no-verify`. Do not open the PR until everything passes.

## Phase 7 — Commit

Most commits already exist from Phase 5 (each plan task ends with a commit). Phase 7 is a sanity check on the history.

Project Git conventions (from `CLAUDE.md`):

- Conventional Commits: `<type>(<scope>): <imperative summary>`
- Types: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `perf`, `ci`, `build`
- Imperative mood, summary ≤72 chars, no trailing period
- One logical change per commit; body explains _why_, not _what_

If `git log` shows mixed concerns in one commit, rework before pushing.

## Phase 8 — Open the PR

```bash
git push -u origin <type>/<slug>
```

Generate a PR title from the issue title in conventional-commits format (matching the branch type). Compose the body — substituting `<N>` with the issue number — then open the PR:

```bash
gh pr create --title "<type>(<scope>): <imperative summary>" --body "$(cat <<'EOF'
## Summary
- <bullet 1>
- <bullet 2>

## Test plan
- [ ] <step>
- [ ] <step>

Closes #<N>
EOF
)"
```

The `Closes #<N>` trailer is required. It links the PR to the issue, auto-closes the issue on merge, and lets GitHub's built-in Projects v2 workflow move the item to `Done`.

Capture the returned PR URL — Phase 10 prints it.

## Phase 9 — Move to In review

```bash
gh project item-edit \
  --project-id "$PROJECT_ID" \
  --id "$ITEM_ID" \
  --field-id PVTSSF_lAHOAA2SwM4BXZBHzhSmJ-o \
  --single-select-option-id df73e18b
```

Then **verify the update landed** using the [Verify a Status update](#verify-a-status-update) pattern. Expected value: `In review`.

Do **not** set Status to `Done`. Merging the PR with `Closes #N` lets GitHub's built-in Projects v2 workflow do that.

If `ITEM_ID` was empty (issue not on the board), skip this phase.

## Phase 10 — Handoff

Print to the user:

```
Done.

PR:    <pr_url>
Issue: #<N> — <title>

Suggest: /clear, then /do-issue <next-N> for the next ticket.
```

The skill ends here.

## Error handling

| Condition                                            | Behavior                                                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `gh` missing the `project` scope                     | Print `gh auth refresh -s project` and exit before any work                                                 |
| Issue not found                                      | Exit with the `gh` error message                                                                            |
| Branch already exists (local or remote)              | Abort with a clear message; do not overwrite                                                                |
| Issue Status is `In progress` or `Done`              | Warn, ask before continuing                                                                                 |
| Issue Status is `Backlog`                            | Warn (not Ready), ask before continuing                                                                     |
| Issue not on the Project board (`ITEM_ID` empty)     | Skip Status updates, continue with branch + PR flow                                                         |
| Verification gate fails                              | Report the failure, fix and re-run; do NOT open the PR                                                      |
| `gh project item-edit` succeeds but Status unchanged | Retry the same command once; re-verify; if still wrong, surface to the user with current vs expected status |
| User answers `abort` at the checkpoint               | Leave the branch in place; exit cleanly with a resume note                                                  |

The scope check for missing `gh` permissions is documented as Phase 0 above.
