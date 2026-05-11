---
name: do-issue
description: Use when the user invokes `/do-issue <N>` or asks to work a specific GitHub issue from the Robin's Nest Rescue Project board (https://github.com/users/abohannon/projects/1). Accepts a bare issue number or full issue URL. Drives the ticket from Ready to a linked PR in `In review`, pausing once for user approval of the plan.
---

# /do-issue — Drive one GitHub issue to a PR

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

| Label | Branch type |
|---|---|
| `enhancement` or `feature` | `feat` |
| `bug` | `fix` |
| `chore` | `chore` |
| `refactor` | `refactor` |
| `docs` | `docs` |
| (no matching label) | ASK at Phase 4 checkpoint — do not guess |

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

### Pre-flight status checks (warn before continuing)

- Current Status is `In progress` or `Done` → warn the user (work may already exist), ask whether to continue
- Current Status is `Backlog` → warn (issue isn't `Ready`), ask whether to continue
- Current Status is `Ready` → proceed silently
