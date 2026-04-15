# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for Robin's Nest Rescue, a 501(c)(3) animal sanctuary providing education and advocacy for animal protection and human-animal bonds. The site supports donations, farm tour bookings, and animal profiles.

## Tech Stack

- **Astro 6** — static output mode with Cloudflare adapter (`@astrojs/cloudflare`)
- **Sanity CMS v5** — headless CMS with embedded studio at `/admin`
- **React 19** — interactive components via `@astrojs/react`
- **Tailwind CSS v4** — utility-first styling
- **astro-portabletext** — rendering Sanity Portable Text in Astro
- **TypeScript** — strict mode (`astro/tsconfigs/strict`)

## Commands

```bash
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build locally
```

## Architecture

- `src/pages/` — Astro file-based routing (`.astro` files become routes)
- `src/` — will contain `components/`, `layouts/`, `lib/` as the project grows
- `sanity.config.ts` — Sanity Studio config (schema types defined here)
- `astro.config.mjs` — Astro config with Sanity integration and React
- `public/` — static assets served as-is

## Environment Variables

Required env vars (see `.env.example`):

- `PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `PUBLIC_SANITY_DATASET` — Sanity dataset name (defaults to `production`)

All public env vars use the `PUBLIC_` prefix per Astro convention.

## Sanity Integration

- Sanity client is configured via the `@sanity/astro` integration (not manually instantiated)
- Studio is accessible at `/admin` in the running app
- Use `@sanity/image-url` for image URL building from Sanity assets
- Schema types are defined in `sanity.config.ts` — add new content types there
- Use `astro-portabletext` components for rendering rich text from Sanity

## Donations & Transactions

- **Givebutter** — current donation/transaction POS platform ([dashboard](https://dashboard.givebutter.com/accounts/131875/home))
- All donation flows and payment processing go through Givebutter for now
- A more robust transaction service may replace Givebutter in the future, but all current solutions must use Givebutter

## Deployment

- **Cloudflare Workers** via `wrangler` (dev dependency)
- Worker name: `robins-nest-rescue-demo`
- Deployed URL: `https://robins-nest-rescue-demo.abohannon.workers.dev`
- Deployment is triggered automatically on git push via Cloudflare's CI/CD (build command: `npm run build`, deploy command: `npx wrangler deploy`)
- Use `npx wrangler deployments list --name robins-nest-rescue-demo` to check deployment status
- Environment variables (e.g., Sanity credentials) must be set in Cloudflare Workers settings

## MCP Servers

- **astro-docs** — provides `search_astro_docs` tool for querying the official Astro documentation. Use this when writing Astro code to verify APIs, check component usage, confirm configuration options, or look up any Astro-specific patterns. Prefer consulting these docs over relying on training data, since Astro evolves quickly.

## Git Conventions

### Branch Naming

Format: `<type>/<short-description>`

- Use lowercase kebab-case for the description
- Keep it concise but descriptive (2–4 words)
- **Types:** `feat/`, `fix/`, `chore/`, `refactor/`, `style/`, `docs/`, `test/`, `perf/`, `ci/`
- Branch off `main` — never branch from another feature branch unless explicitly coordinating dependent work
- Delete branches after merge

Examples: `feat/animal-profiles`, `fix/donate-button-overflow`, `chore/upgrade-astro-6`, `refactor/sanity-queries`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) strictly.

```
<type>(<scope>): <imperative summary>

<optional body — explain WHY, not WHAT>

<optional footer — e.g., BREAKING CHANGE: ...>
```

**Rules:**

- **Types:** `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `perf`, `ci`, `build`
- **Scope** is encouraged for targeted changes — use the feature area or component name: `feat(donate)`, `fix(animal-hero)`, `chore(deps)`
- Use **imperative mood** in the summary ("add", "fix", "update" — not "added", "fixes", "updated")
- Keep the summary line **under 72 characters**
- Do **not** end the summary with a period
- Use a body (separated by blank line) when the "why" isn't obvious — explain motivation, not mechanics
- **One logical change per commit** — don't mix a feature, a formatting fix, and a dependency bump in one commit. Each commit should be independently reviewable and revertable.
- Mark breaking changes with `BREAKING CHANGE:` in the footer or `!` after the type: `feat(api)!: change response format`

**Good:**

```
feat(donate): add suggested donation label with $25 default

The previous UI had no visual anchor for donation amounts, leading to
lower average donations. Adding a suggested label nudges toward a
reasonable default.
```

**Bad:**

```
updated stuff
fixed things and also reformatted some files
feat: changes
```

### Pull Request Titles

Format: same as commit messages — `<type>(<scope>): <imperative summary>`

- The title should describe the **overall change**, not individual commits
- Keep under 72 characters
- Scope should reflect the primary feature area

### Pull Request Descriptions

Every PR must include:

- **Summary** — 1–3 bullet points explaining what changed and why
- **Test plan** — how reviewers can verify the change (manual steps, automated tests, screenshots for UI)
- Link to related issue/ticket if one exists

### Commit Hygiene

- **Atomic commits** — each commit compiles, passes lint, and represents one logical unit of work
- **No WIP commits on `main`** — squash or rewrite messy history before merging if needed
- **Prefer rebase over merge commits** for feature branches to keep history linear
- **Never force-push to `main`** — force-push to feature branches only when cleaning up before review

## Conventions

- **Reuse over reinvention** — always check for existing components before creating new ones. Extract shared UI into reusable components in `src/components/`. Do not duplicate markup, styles, or logic across files. One-off solutions should only be created when reuse is genuinely not feasible.
- **Good software engineering practices** — write clean, maintainable, and well-structured code. Keep components focused and single-responsibility. Use meaningful names. Avoid dead code, magic values, and copy-paste duplication. Refactor when patterns emerge.
- Prefer Astro components (`.astro`) for static/server-rendered content; use Astro components with inline `<script>` tags for simple client-side interactions (toggles, accordions, etc.); reserve React for complex stateful UI that benefits from component-level reactivity (forms with validation, dynamic lists, real-time updates)
- Use Astro's built-in `<Image>` component for optimized images from local sources; use `@sanity/image-url` for Sanity-hosted images
- All UI must be responsive and mobile-friendly — use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.) and test layouts at mobile widths
- Keep Sanity queries co-located with the pages/components that use them
- Follow WCAG 2.1 accessibility guidelines — use semantic HTML elements, provide alt text for all images, ensure sufficient color contrast, support keyboard navigation, and use ARIA attributes only when semantic HTML is insufficient
- Node >= 22.12.0 required
