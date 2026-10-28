# aynsdev/ui

A refined, minimalist design system: pure neutral greys, a near-black dark mode, Inter at weight 500, filled surfaces with generous radii and pill-shaped actions. It is distributed as a **shadcn registry**: components are copied into your project, and from then on you own them.

- Built on Radix, Tailwind CSS v4 and cva, following the shadcn/ui conventions (`cn`, `data-slot`, `asChild`, `.dark`).
- One theme item maps the identity onto shadcn's CSS variables, plus a few extra tokens: `success`, `warning`, `info`, `brand`, `subtle-foreground`, `border-strong`, `pressed`, `shadow-popover`, `shadow-dialog`.
- Every docs page has **Copy → Copy as Markdown / Copy for Claude / Copy for Codex**.
- Brand guidance: [`BRAND.md`](./BRAND.md). The docs **Patterns** page demonstrates settings, searchable data and first-use flows.
- The contract is [`DESIGN.md`](./DESIGN.md).

## At a glance

| | |
| --- | --- |
| **Type** | Inter, weight 500 for all text, 600 for titles, 700 for large headings. Geist Mono for code and shortcuts. |
| **Colour** | Pure neutral greys. Light: `#F5F5F5` canvas, white surfaces. Dark: `#0A0A0A` canvas, `#161616` / `#1F1F1F` raised surfaces. Colour only where it has a role (status, focus, brand). |
| **Surfaces** | Fill, not lines: cards, tables, alerts and accordion rows separate by tone, without borders or shadows. Shadows are for popovers and dialogs only. |
| **Radii** | Pills for buttons, badges, segmented controls and icon buttons. 12px inputs, 10px menu items, 16px menus, tables and toasts, 24px cards and dialogs. |
| **Controls** | Heights 28 / 32 / 40 / 48 / 56px. Avatars 32 / 40 / 48 / 64px. 40px is the default for buttons, inputs and selects. |
| **Motion** | 120–240ms ease-out, opacity and subtle transforms only; respects `prefers-reduced-motion`. |

## Install in a React project

The project needs shadcn/ui set up (`npx shadcn@latest init`). Add the registry to `components.json`:

```json
{
  "registries": {
    "@aynsdev": "https://raw.githubusercontent.com/aynsdev/ui/main/public/r/{name}.json"
  }
}
```

Then install everything (the theme replaces the default colours in your global CSS):

```bash
npx shadcn@latest add @aynsdev/all
```

Or install item by item. Each component also brings the theme.

```bash
npx shadcn@latest add @aynsdev/theme @aynsdev/button @aynsdev/card
```

```tsx
import { Button } from "@/components/ui/button"

<Button loading={saving}>Save changes</Button>
```

**Items:** theme, button, segmented-control, input, textarea, native-select, label, field, checkbox, radio-group, switch, card, accordion, contribution-grid, stat, badge, alert, avatar, tabs, nav, breadcrumb, pagination, dropdown-menu, dialog, tooltip, sonner, table, empty, skeleton, spinner, progress, separator, kbd, theme-switcher, use-theme, all.

### Component notes

- `NativeSelect`: `className` sizes the wrapper, so the chevron follows the width. Style the `<select>` itself with `selectClassName`.
- `AvatarGroup`: the ring that separates avatars uses the page background. On a card, pass `className="*:data-[slot=avatar]:ring-card"`.
- `Card interactive`: shows a soft outline on hover rather than a permanent border.

### Point your coding agent at the rules

```md
## Design
Follow DESIGN.md from github.com/aynsdev/ui for all UI work.
Install components with `npx shadcn@latest add @aynsdev/<name>` before writing new ones.
Don't hard-code colors, spacing or radii: use the theme tokens.
```

Or open the docs, pick a component, choose **Copy → Copy for Claude** and paste it into your session.

## Without React

The plain CSS layer (`ui-*` classes) still ships in the npm package for server-rendered and static sites.

```css
@import "@aynsdev/design-system/fonts.css";  /* optional: Inter */
@import "@aynsdev/design-system/css";        /* tokens + base + components */
```

```html
<button class="ui-button ui-button--secondary ui-button--sm">Cancel</button>
<script src="node_modules/@aynsdev/design-system/dist/ui.js"></script> <!-- menus, tabs, dialogs, toasts -->
```

In this layer the theme is set with `<html data-theme="light|dark">`; with no attribute it follows the OS. For React Native / Expo, import `@aynsdev/design-system/tokens.json`.

## Repo layout

| Path | What |
| --- | --- |
| `registry/ui`, `registry/hooks`, `registry/lib` | Registry sources: the files `shadcn add` copies |
| `scripts/build-registry.mjs` | Item list and theme (single source of truth). Writes `registry.json`, `registry/theme.css`, `public/r/*.json` |
| `public/r` | Built registry, served from GitHub raw |
| `docs/` | Docs app (Vite + React). Examples live in `docs/examples/<id>/NN-name.tsx` |
| `src/css`, `src/vanilla` | Plain CSS + vanilla JS layer, built to `dist/` |
| `tokens/tokens.json` | Tokens for non-CSS platforms |

## Developing

```bash
npm install
npm run dev              # docs at http://localhost:4321
npm run registry:build   # registry.json, registry/theme.css, public/r
npm run typecheck
npm run build            # dist/ (plain CSS layer)
npm run build:docs       # docs-dist/
```
