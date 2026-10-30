# AMLOK website and design system

Local Next.js / React / TypeScript website. `/` is the marketing homepage;
`/brand` is the interactive AMLOK design system for web, marketing, and product UI.

## Run locally

Requires Node.js 20.9+ and pnpm.

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

On this Mac, `./scripts/local.sh dev` (or `install`, `typecheck`, `build`, `start`)
uses the system pnpm or the bundled runtime. If Turbopack cannot launch its CSS
worker in a restricted environment, validate with `pnpm exec next build --webpack`.

Read the installed Next.js documentation under `node_modules/next/dist/docs/`
before changing framework behavior; this project uses Next.js 16.4.

## AMLOK system 1.0

**Protected by structure. Connected by signals.**

- Square geometry: 0px corners on buttons, fields, cards, images, menus, and
  dialogs. No pill controls or decorative chamfers. The original avatar is the
  preserved illustration exception; small round dots encode signals.
- The original A and wordmark remain the identity. Angular shields, square scan
  fields, fine grid lines, and corner brackets form the supporting visual language.
- AMLOK blue `#052698`, signal blue `#2567FF`, navy `#07152F`, and neutral surfaces
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

Development is local only. Nothing has been deployed.
