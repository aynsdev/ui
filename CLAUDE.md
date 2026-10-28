# Design system repo

This repo *is* the design system. `DESIGN.md` is the contract; `registry/` implements it as a shadcn registry, `src/css` as plain CSS.

## Layers
- `registry/`: the shadcn registry sources (`ui/`, `hooks/`, `lib/utils.ts`). Written exactly as they land in a consumer project: imports use `@/components/ui/*`, `@/lib/utils`, `@/hooks/*`.
- `scripts/build-registry.mjs`: the item list and the theme (light/dark values, extra tokens). Single source of truth: it writes `registry.json`, `registry/theme.css` and `public/r/*.json`. Never edit those by hand.
- `docs/`: Vite + React docs app that imports the registry through the same `@/` aliases (`vite.config.ts`, `tsconfig.json`).
- `src/css/` + `src/vanilla/ui.js`: the plain-CSS layer for non-React projects (`ui-*` classes, `data-theme`), built to `dist/`.

## Rules
- Components follow shadcn conventions: Radix via `radix-ui`, cva for variants, `cn`, `data-slot` on every part, `asChild` where it makes sense, `"use client"` only where hooks or Radix need it.
- Style only with theme tokens (`bg-background`, `text-muted-foreground`, `border-border`, `text-success`…). Never hard-code a colour in a component.
- Use arbitrary font sizes (`text-[13px]`), not custom `text-*` theme names: tailwind-merge would treat them as colours.
- State goes in ARIA/data attributes (`aria-invalid`, `aria-current`, `aria-pressed`, `data-state`), not state classes.
- Theme changes go in `scripts/build-registry.mjs`; if the plain-CSS layer should match, also update `src/css/tokens.css` (both dark blocks), `tokens/tokens.json` and `src/css/tailwind.css`.
- New component checklist: `registry/ui/<name>.tsx`, `ui(...)` entry in `scripts/build-registry.mjs`, docs entry in `docs/lib/registry.ts`, examples in `docs/examples/<id>/NN-name.tsx` (01 is the main preview). Examples appear as live previews, as source and inside the Copy-as-Markdown / agent prompts, so keep them clean and self-contained.
- Before committing: `npm run registry:build && npm run typecheck && npm run build && npm run build:docs`, and commit `registry.json`, `registry/theme.css`, `public/r` and `dist/`. Check the docs in both themes and at 390px width.
- Verify registry changes by installing into a fresh shadcn app (`npx shadcn add` from a local server serving `public/`).
