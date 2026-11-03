# Amlok website and design system

Local Next.js / React / TypeScript website. `/` is the marketing homepage;
`/brand` is the interactive Amlok design system for web, marketing, and product UI.

## Run locally

Requires Node.js 22+ and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:3000. The server binds to loopback only.

```sh
pnpm typecheck
pnpm build
pnpm start
```

`pnpm build` exports the site to `out/`. `pnpm start` previews that export
with Cloudflare's local runtime on http://127.0.0.1:3000. Stop the Next.js
dev server first if it is using the same port. The Cloudflare preview runs the
live `/api/status` endpoint; `pnpm dev` only previews the static website UI.

On this Mac, `./scripts/local.sh dev` (or `install`, `typecheck`, `build`, `start`)
uses the system pnpm or the bundled runtime. If Turbopack cannot launch its CSS
worker in a restricted environment, validate with `pnpm exec next build --webpack`.

Read the installed Next.js documentation under `node_modules/next/dist/docs/`
before changing framework behavior; this project uses Next.js 16.4.

## Sitemap and canonical URLs

The website generates `/sitemap.xml` and `/robots.txt` during the static build.
Preview them locally at http://127.0.0.1:3000/sitemap.xml and
http://127.0.0.1:3000/robots.txt.

`src/content/page-index.json` is the shared index for site search, the human-readable
`/site-map`, and XML sitemap. The content pages are defined in
`src/content/site-pages.json` and rendered by `src/components/content-page.tsx`
through the statically generated catch-all route. Add new public pages to both
content files. The brand guidelines page is excluded because it is marked `noindex`.
The original architecture and implementation status live in `docs/website-sitemap.md`.

After building, run `python3 scripts/verify-site.py` to check all public pages,
internal links and anchors, local assets, canonical URLs, headings, and sitemap coverage.
Interactive page tools live in `src/components/page-tools.tsx`. The contact form
opens an email draft; it does not submit to a backend. Research covers are previews,
workflow stories are illustrative. The status page checks public web availability;
product API telemetry is shown separately as not connected.

The blog at `/blog` uses `src/content/blog-posts.json` for card metadata, topics,
author, dates, and image paths; article bodies remain in `site-pages.json`.
Its nine starter articles use editable SVG placeholders in `public/images/blog`.
Topic/search/pagination state is shareable through `?topic=monitoring&q=noise&page=1#all-posts`.
The signup form prepares an email request to `support@amlok.io`; it does not
store addresses or subscribe anyone automatically. Connect a mailing-list service
before replacing that explicit request flow with direct subscriptions.

The canonical origin is `https://amlok.io`, including preview builds.
Sitemap URLs, robots, structured data, and page canonicals share this value in
`src/lib/site-config.ts`. Legacy paths are permanently redirected through
`public/_redirects` on Cloudflare.

## Amlok system 1.0

**Protected by structure. Connected by signals.**

- Square geometry: 0px corners on buttons, fields, cards, images, menus, and
  dialogs. No pill controls or decorative chamfers. The original avatar is the
  preserved illustration exception; small round dots encode signals.
- The original A and wordmark remain the identity. Angular shields, square scan
  fields, fine grid lines, and corner brackets form the supporting visual language.
- Amlok blue `#052698`, signal blue `#2567FF`, navy `#07152F`, and neutral surfaces
  anchor a unified semantic palette with light and dark theme pairs.
- Inter for headings and body text; JetBrains Mono for short structured labels.
  Use shared type roles, a 4px spacing rhythm, and a 1344px content grid.
- Website content aligns with the header. Use viewport space when content fits;
  allow natural flow on mobile and at larger text sizes. Never clip text to force fit.
- UI guidance covers control states, forms, navigation, overlays, data tables,
  evidence, charts, loading/empty/error states, and human review of AI assessments.
- Marketing guidance covers web, presentation, social, research, and email formats,
  imagery, voice, source attribution, and claims.
- Accessibility targets WCAG 2.2 AA, with visible keyboard focus, semantic controls,
  contrast checks, responsive reflow, and reduced motion. This is a delivery target,
  not an accessibility certification.

The `/brand` demos use local sample state and fictional records. They send no
form data. Fonts are served locally. Existing homepage partner images are remote.

## Source of truth

- `src/lib/brand.ts`: design tokens, light/dark themes, metadata, and palette roles.
  The root layout consumes the same CSS exported at `/brand/tokens`.
- `src/components/brand-system.tsx`: guidelines and live specimen composition.
- `src/components/brand-demos.tsx`: functional controls, data workspace, and visual motifs.
- `src/components/brand-avatar.tsx`: preserved avatar artwork and composition.
- `src/app/enterprise-system.css`: namespaced guide and specimen styles.
- `src/app/home-system.css`: the current system applied to homepage components.
- `src/app/globals.css`: shared primitives, preserved avatar styles, and homepage layout.
- `src/components/home-hero.tsx`: homepage sections and existing scroll interactions.
- `src/components/ui.tsx`: original mark/wordmark and shared action/status primitives.
- `THIRD_PARTY_NOTICES.txt`: retained upstream attribution and licensing.

Change guidelines and tokens before adding a new visual pattern. Validate desktop
and mobile layouts, both guide themes, keyboard behavior, reduced motion, and
loading/error states. A major version changes existing contracts; minor versions
add compatible patterns; patches correct implementation or documentation.

## Cloudflare deployment

The `website` Worker in the Amlok Tech account is connected to
`amloktech/website`, branch `main`. Keep its build settings as:

- Build command: `pnpm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

`wrangler.jsonc` serves the static Next.js export from `out/`, including
the custom 404 page. Images are served directly from the exported assets;
there is no Next.js image-optimization server. The brand token download's
response headers are preserved in `public/_headers`.

Wrangler is pinned in the lockfile. Only the pinned `esbuild` and `workerd`
setup scripts are approved in `pnpm-workspace.yaml`, so CI does not need
an interactive `pnpm approve-builds` step or automatic framework migration.

To validate a deployment without publishing:

```sh
pnpm build
pnpm exec wrangler deploy --dry-run
```

Authenticated maintainers can also publish with `pnpm run deploy`.

## Public status monitoring

`worker/index.ts` serves `GET /api/status` and `HEAD /api/status`. The rest of the
site stays on Cloudflare Static Assets, including `_redirects` and `_headers`.
The endpoint probes a fixed homepage asset through the ASSETS binding and the
public documentation homepage over HTTPS. Probes have a five-second timeout;
reports are cached at the edge for up to 60 seconds. No credentials, customer
data, or caller-supplied probe URLs are accepted.

`/status` refreshes every minute while visible. Failed refreshes, unknown results,
and reports over two minutes old are never displayed as healthy. These checks
cover public website delivery and documentation reachability, not external DNS,
product APIs, assessment jobs, data-source freshness, or webhook delivery.
Product API telemetry needs a verified production monitoring endpoint before it
can be connected. No Mintlify deployment or documentation edits are involved.

Build and typecheck regenerate the ignored Worker types from `wrangler.jsonc`.
Run `pnpm test:status` for probe, failure, timeout, and freshness checks, then
`pnpm build` and `pnpm start` to test the complete website in Cloudflare's local
runtime. Support links use `support@amlok.io`; mailbox provisioning is managed
outside this website repository.
