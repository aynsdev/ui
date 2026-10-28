# Design System

A refined, minimalist design system for websites, SaaS dashboards, desktop and mobile products.
Typography carries the hierarchy, neutrals carry the interface, and color appears only when it has a job.

- **[DESIGN.md](./DESIGN.md)** is the design contract: principles, rules and anti-patterns. Read it first.
- **`src/`** has the tokens and components as plain CSS, so they work with any framework.
- **`docs/index.html`** is the living reference for every component, in light and dark mode.

```
DESIGN.md              the rules (for humans and coding agents)
PROJECT_THEME.md       per-project override template
src/
  tokens.css           colors, type, spacing, radius, motion, light + dark
  base.css             reset + element defaults (optional)
  typography.css       .ui-h1 … .ui-caption, .ui-link, .ui-kbd
  layout.css           .ui-container .ui-stack .ui-row .ui-grid .ui-shell
  components/          button, icon-button, segmented, form, surface, badge,
                       navigation, overlay, data
  index.css            everything above
  fonts.css            Geist + Geist Mono (Google Fonts, optional)
  tailwind.css         Tailwind v4 bridge
  ui.js                menus, tabs, segmented, dialogs, theme, toasts (~5 kB, no deps)
tokens/tokens.json     same tokens for React Native, SwiftUI, Figma …
dist/                  single-file bundle for <link> / CDN use
```

## Preview

```bash
npm run docs     # → http://localhost:4321/docs/
```

Or just open `docs/index.html` in a browser.

## Use it in another project

### 1. Install

```bash
npm i github:aynsdev/design-system          # pin a version with #v1.0.0
```

Or, with no build step, link the bundle from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aynsdev/design-system@v1.0.0/src/fonts.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aynsdev/design-system@v1.0.0/dist/design-system.min.css">
<script src="https://cdn.jsdelivr.net/gh/aynsdev/design-system@v1.0.0/dist/ui.js" defer></script>
```

### 2. Import

```css
/* app.css */
@import "@aynsdev/design-system/fonts.css";  /* optional */
@import "@aynsdev/design-system/css";        /* tokens + base + components */
@import "./project-theme.css";               /* this product's --brand */
```

```js
// main.js — optional behaviour layer (skip if your framework handles menus/dialogs)
import "@aynsdev/design-system/ui.js";
```

Only want the foundations? Import `tokens.css` alone and pick components one by one:

```css
@import "@aynsdev/design-system/tokens.css";
@import "@aynsdev/design-system/components/button.css";
```

### 3. Give the project its identity

Copy `PROJECT_THEME.md` into the project, fill it in, and override the four brand tokens
(`--brand`, `--brand-hover`, `--on-brand`, `--brand-soft`). Everything else stays shared.

### 4. Point your coding agent at the rules

Add this to the project's `CLAUDE.md` / `AGENTS.md`:

```md
## Design
Follow node_modules/@aynsdev/design-system/DESIGN.md for all UI work.
Project-specific overrides live in PROJECT_THEME.md and take precedence.
Use the ui-* classes and semantic tokens; don't hard-code colors, spacing or radii.
```

## Framework notes

**React / Vue / Blade / plain HTML**: use the classes directly.

```jsx
<button className="ui-button ui-button--secondary ui-button--sm">Cancel</button>
<button className="ui-button" aria-busy={saving} disabled={saving}>Save changes</button>
```

**Tailwind v4**: map the tokens to utilities:

```css
@import "tailwindcss";
@import "@aynsdev/design-system/tokens.css";
@import "@aynsdev/design-system/tailwind.css";
```

```html
<div class="bg-surface border border-border rounded-lg p-5 text-ui text-muted">…</div>
```

**shadcn/ui or shadcn-vue**: point their CSS variables at these tokens
(`--background: var(--bg)`, `--primary: var(--action)`, `--ring: var(--focus)` …) instead of
replacing the component library.

**React Native / Expo**: import `tokens.json` into your theme file. Letter-spacing values are
in `em`, so multiply them by the font size.

## Theming

| Markup | Result |
| --- | --- |
| *(no attribute)* | Follows the OS setting |
| `<html data-theme="light">` | Forced light |
| `<html data-theme="dark">` | Forced dark |

`ui.js` persists the choice: `UI.theme.set("system" | "light" | "dark")`.

## Components

| Component | Classes |
| --- | --- |
| Button | `ui-button` + `--secondary --soft --ghost --danger --danger-soft --brand --link`, `--xs --sm --lg --xl`, `--pill --block`, `aria-busy="true"` |
| Icon button | `ui-icon-button` + `--secondary --soft --primary`, `--xs --sm --lg`, `--round` |
| Segmented | `ui-segmented` > `ui-segmented__item[role=radio]` |
| Field | `ui-field`, `ui-label`, `ui-hint`, `ui-error-text`, `ui-input`, `ui-textarea`, `ui-select`, `ui-input-group` |
| Choice | `ui-check` with `ui-checkbox`, `ui-radio`, `ui-switch` |
| Card | `ui-card` + `__header __title __description __body __footer`, `--compact --flat --interactive` |
| Stat | `ui-stat` + `__label __value __delta(--up/--down)` |
| Badge | `ui-badge` + `--success --warning --danger --info --brand --outline --strong --sm --pill` |
| Alert | `ui-alert` + `--info --success --warning --danger` |
| Avatar | `ui-avatar` + `--sm --lg --square`, `ui-avatar-stack` |
| Tabs | `ui-tabs` > `ui-tab[role=tab]`, `ui-tab-panel` |
| Sidebar nav | `ui-nav`, `ui-nav__section`, `ui-nav__item[aria-current=page]` |
| Breadcrumbs / pagination | `ui-breadcrumbs`, `ui-pagination` |
| Menu / popover | `ui-menu-anchor`, `ui-menu`, `ui-menu__item`, `ui-popover` |
| Dialog | `<dialog class="ui-dialog">` + `__header __title __body __footer` |
| Tooltip | `data-tooltip="…"` |
| Toast | `UI.toast({ title, body, tone })` |
| Table | `ui-table-wrap` > `ui-table`, `.is-numeric`, `ui-table__sort` |
| Feedback | `ui-empty`, `ui-skeleton`, `ui-spinner`, `ui-progress` |
| Layout | `ui-container`, `ui-stack`, `ui-row`, `ui-grid`, `ui-shell` |

## Changing the system

1. Edit `src/` (and `tokens/tokens.json` if you change a token value).
2. Check the change in `docs/index.html` in both themes.
3. `npm run build`, commit, and tag a release (`git tag v1.1.0`) so projects can pin to it.
