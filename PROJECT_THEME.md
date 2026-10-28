# PROJECT_THEME.md — [Product Name]

> Copy this file into a new project next to its code. It records the justified deviations from
> `DESIGN.md` for that one product. Project rules here win over the shared system.

## Brand
- Product name:
- Brand personality (3 words):
- Existing logo / assets (paths):
- Primary accent color:
- On-accent foreground color:
- Accent hover and soft variants:
- Font override (only if necessary):

## Product context
- Platform(s): web / desktop / iOS / Android
- Main theme: light / dark / system
- Density: spacious marketing / standard SaaS / compact professional tool
- Must-preserve features and workflows:
- Existing component library / theme location:

## Overrides
- Approved deviations from DESIGN.md and why:
- Areas that should not be visually changed:

## Verification
- Key routes/screens to test:
- Keyboard / accessibility-critical interactions:

---

## Theme CSS starter

Save as `project-theme.css` and load it **after** the design system. Check contrast for every override
(4.5:1 for text, 3:1 for control boundaries).

```css
:root {
  --brand: #2f5d50;
  --brand-hover: #264c42;
  --on-brand: #ffffff;
  --brand-soft: #e8efec;
  /* --font-ui: "Inter", -apple-system, sans-serif;  only if justified */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --brand: #7fc4ad;
    --brand-hover: #95d0bc;
    --on-brand: #0f1a16;
    --brand-soft: #1b2925;
  }
}

:root[data-theme="dark"] {
  --brand: #7fc4ad;
  --brand-hover: #95d0bc;
  --on-brand: #0f1a16;
  --brand-soft: #1b2925;
}
```
