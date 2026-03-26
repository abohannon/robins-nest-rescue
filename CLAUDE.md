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

## Deployment

- **Cloudflare Workers** via `wrangler` (dev dependency)
- Worker name: `robins-nest-rescue-demo`
- Deployed URL: `https://robins-nest-rescue-demo.abohannon.workers.dev`
- Deployment is triggered automatically on git push via Cloudflare's CI/CD (build command: `npm run build`, deploy command: `npx wrangler deploy`)
- Use `npx wrangler deployments list --name robins-nest-rescue-demo` to check deployment status
- Environment variables (e.g., Sanity credentials) must be set in Cloudflare Workers settings

## Conventions

- Prefer Astro components (`.astro`) for static/server-rendered content; use Astro components with inline `<script>` tags for simple client-side interactions (toggles, accordions, etc.); reserve React for complex stateful UI that benefits from component-level reactivity (forms with validation, dynamic lists, real-time updates)
- Use Astro's built-in `<Image>` component for optimized images from local sources; use `@sanity/image-url` for Sanity-hosted images
- All UI must be responsive and mobile-friendly — use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.) and test layouts at mobile widths
- Keep Sanity queries co-located with the pages/components that use them
- Follow WCAG 2.1 accessibility guidelines — use semantic HTML elements, provide alt text for all images, ensure sufficient color contrast, support keyboard navigation, and use ARIA attributes only when semantic HTML is insufficient
- Node >= 22.12.0 required
