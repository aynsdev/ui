# Design system repo

This repo *is* the design system. `DESIGN.md` is the contract; `src/` implements it.

- Plain CSS, no build step needed to use `src/`. `npm run build` produces `dist/` (inlined bundle + ui.js copy) — rebuild and commit `dist/` after changing `src/`.
- All component styles read from semantic tokens in `src/tokens.css`. Never hard-code a color in a component.
- Dark values are declared twice in `tokens.css` (the `prefers-color-scheme` block and `[data-theme="dark"]`). Change both.
- Token values are mirrored in `tokens/tokens.json` and in the literal values in `src/tailwind.css`. Keep all three in sync.
- Class naming: `ui-block`, `ui-block__element`, `ui-block--modifier`. State goes in ARIA attributes (`aria-checked`, `aria-selected`, `aria-current`, `aria-busy`, `aria-invalid`), not in state classes.
- `src/ui.js` is a classic script (no ESM) so the docs work over `file://`. Keep it dependency-free.
- Every new component gets a section in `docs/index.html` and a row in the README table. Check it in both themes.
