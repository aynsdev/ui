// Single source of truth for the shadcn registry.
// Writes registry.json and registry/theme.css (the theme as plain CSS, for manual installs and the docs),
// then runs `shadcn build` to produce public/r/<name>.json.
//
//   node scripts/build-registry.mjs            # registry.json + public/r
//   node scripts/build-registry.mjs --json     # registry.json only

import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

export const NAMESPACE = "@aynsdev"
export const REGISTRY_URL = "https://raw.githubusercontent.com/aynsdev/ui/main/public/r/{name}.json"

const ns = (name) => `${NAMESPACE}/${name}`

/* Theme: the visual identity, mapped onto shadcn's CSS variables + a few extras */

const light = {
  radius: "0.75rem",
  "motion-fast": "150ms",
  "motion-base": "180ms",
  "motion-slow": "200ms",
  background: "#f5f5f5",
  foreground: "#171717",
  card: "#ffffff",
  "card-foreground": "#171717",
  popover: "#ffffff",
  "popover-foreground": "#171717",
  primary: "#171717",
  "primary-foreground": "#fafafa",
  secondary: "#ebebeb",
  "secondary-foreground": "#171717",
  muted: "#ebebeb",
  "muted-foreground": "#5c5c5c",
  accent: "#e5e5e5",
  "accent-foreground": "#171717",
  destructive: "#b42318",
  "destructive-foreground": "#ffffff",
  border: "#e8e8e8",
  input: "#dedede",
  ring: "#4f78c7",
  // extras
  "subtle-foreground": "#8a8a8a",
  "border-strong": "#d1d1d1",
  pressed: "#dcdcdc",
  success: "#19724b",
  warning: "#946200",
  info: "#4f78c7",
  brand: "#171717",
  "on-brand": "#fafafa",
  "brand-foreground": "var(--on-brand)",
  "brand-hover": "#303030",
  "brand-pressed": "#404040",
  "brand-soft": "#ebebeb",
  "brand-soft-foreground": "#171717",
  overlay: "rgb(10 10 10 / 0.4)",
  "popover-shadow": "0 0 0 1px rgb(0 0 0 / 0.04), 0 12px 32px -8px rgb(0 0 0 / 0.16)",
  "dialog-shadow": "0 0 0 1px rgb(0 0 0 / 0.04), 0 32px 64px -16px rgb(0 0 0 / 0.24)",
}

const dark = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  card: "#161616",
  "card-foreground": "#fafafa",
  popover: "#1c1c1c",
  "popover-foreground": "#fafafa",
  primary: "#fafafa",
  "primary-foreground": "#0a0a0a",
  secondary: "#1f1f1f",
  "secondary-foreground": "#fafafa",
  muted: "#1f1f1f",
  "muted-foreground": "#a1a1a1",
  accent: "#262626",
  "accent-foreground": "#fafafa",
  destructive: "#f97066",
  "destructive-foreground": "#0a0a0a",
  border: "#222222",
  input: "#2e2e2e",
  ring: "#a5beff",
  "subtle-foreground": "#737373",
  "border-strong": "#404040",
  pressed: "#303030",
  success: "#52c593",
  warning: "#f5bc59",
  info: "#a5beff",
  brand: "#fafafa",
  "on-brand": "#0a0a0a",
  "brand-foreground": "var(--on-brand)",
  "brand-hover": "#e5e5e5",
  "brand-pressed": "#dcdcdc",
  "brand-soft": "#1f1f1f",
  "brand-soft-foreground": "#fafafa",
  overlay: "rgb(0 0 0 / 0.64)",
  "popover-shadow": "0 0 0 1px rgb(255 255 255 / 0.06), 0 12px 32px -8px rgb(0 0 0 / 0.6)",
  "dialog-shadow": "0 0 0 1px rgb(255 255 255 / 0.06), 0 32px 64px -16px rgb(0 0 0 / 0.7)",
}

// Registered with Tailwind (@theme inline) so they become utilities: bg-success, text-subtle-foreground…
const themeVars = {
  "font-sans": '"Inter", "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  "font-mono": '"Geist Mono", ui-monospace, "SFMono-Regular", Menlo, monospace',
  "color-destructive-foreground": "var(--destructive-foreground)",
  "color-subtle-foreground": "var(--subtle-foreground)",
  "color-border-strong": "var(--border-strong)",
  "color-pressed": "var(--pressed)",
  "color-success": "var(--success)",
  "color-warning": "var(--warning)",
  "color-info": "var(--info)",
  "color-brand": "var(--brand)",
  "color-brand-hover": "var(--brand-hover)",
  "color-brand-pressed": "var(--brand-pressed)",
  "color-brand-soft": "var(--brand-soft)",
  "color-brand-soft-foreground": "var(--brand-soft-foreground)",
  "color-on-brand": "var(--on-brand)",

  "color-brand-foreground": "var(--brand-foreground)",
  "color-overlay": "var(--overlay)",
  "shadow-popover": "var(--popover-shadow)",
  "shadow-dialog": "var(--dialog-shadow)",
  // Large radii for cards and dialogs (sm–xl come from shadcn's own --radius scale)
  "radius-2xl": "calc(var(--radius) + 8px)",
  "radius-3xl": "calc(var(--radius) + 12px)",
}

export const theme = { theme: themeVars, light, dark }

const baseCss = {
  "@layer base": {
    body: {
      "font-weight": "500",
      "letter-spacing": "-0.011em",
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
      "text-rendering": "optimizeLegibility",
    },
    "::selection": { "background-color": "color-mix(in oklab, var(--ring) 28%, transparent)" },
    "h1, h2, h3, h4": { "text-wrap": "balance" },
  },
}

/* registry/theme.css: what `shadcn add @aynsdev/theme` writes, as one file */

const SHADCN_COLORS = [
  "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
  "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "border", "input", "ring",
]

const block = (selector, vars, indent = "  ") =>
  `${selector} {\n${Object.entries(vars).map(([k, v]) => `${indent}--${k}: ${v};`).join("\n")}\n}`

export function themeCss() {
  const inline = {
    ...Object.fromEntries(SHADCN_COLORS.map((c) => [`color-${c}`, `var(--${c})`])),
    "radius-sm": "calc(var(--radius) - 4px)",
    "radius-md": "calc(var(--radius) - 2px)",
    "radius-lg": "var(--radius)",
    "radius-xl": "calc(var(--radius) + 4px)",
    ...themeVars,
  }
  return [
    "/* Generated by scripts/build-registry.mjs. Paste into your globals.css after\n   @import \"tailwindcss\"; @import \"tw-animate-css\"; @custom-variant dark (&:is(.dark *)); */",
    block("@theme inline", inline),
    block(":root", light),
    block(".dark", dark),
    `@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-weight: 500;
    letter-spacing: -0.011em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  ::selection {
    background-color: color-mix(in oklab, var(--ring) 28%, transparent);
  }
  h1, h2, h3, h4 {
    text-wrap: balance;
  }
}`,
  ].join("\n\n") + "\n"
}

/* Items */

const RADIX = ["radix-ui"]
const CVA = ["class-variance-authority"]
const ICONS = ["lucide-react"]

const ui = (name, title, description, { deps = [], reg = [] } = {}) => ({
  name,
  type: "registry:ui",
  title,
  description,
  dependencies: deps,
  registryDependencies: ["utils", ns("theme"), ...reg.map(ns)],
  files: [{ path: `registry/ui/${name}.tsx`, type: "registry:ui" }],
})

export const items = [
  {
    name: "theme",
    type: "registry:theme",
    title: "Theme",
    description: "Pure neutral greys, a near-black dark mode, Inter at weight 500, generous radii, and the extra tokens the components use.",
    cssVars: theme,
    css: baseCss,
  },
  ui("button", "Button", "The signature component. Pill-shaped, eight variants, five sizes, icon sizes and a width-preserving loading state.", { deps: [...RADIX, ...CVA] }),
  ui("segmented-control", "Segmented Control", "A compact track for switching a related mode or filter.", { deps: [...RADIX, ...CVA] }),
  ui("input", "Input", "Single-line text input."),
  ui("textarea", "Textarea", "Multi-line text input."),
  ui("native-select", "Native Select", "The native <select> with a custom chevron.", { deps: ICONS }),
  ui("label", "Label", "Accessible label for form controls.", { deps: RADIX }),
  ui("field", "Field", "Label, control, description and error with consistent rhythm.", { deps: ICONS, reg: ["label", "use-field"] }),
  ui("checkbox", "Checkbox", "Checkbox with indeterminate state.", { deps: [...RADIX, ...ICONS] }),
  ui("radio-group", "Radio Group", "One choice from a short, visible list.", { deps: RADIX }),
  ui("switch", "Switch", "Toggle for settings that apply immediately.", { deps: RADIX }),
  ui("card", "Card", "A filled surface with generous corners.", { deps: RADIX }),
  ui("accordion", "Accordion", "Stacked, filled disclosure rows for questions and details.", { deps: [...RADIX, ...ICONS] }),
  ui("popover", "Popover", "Contextual controls in a compact, focus-aware surface.", { deps: RADIX }),
  ui("alert-dialog", "Alert Dialog", "An explicit confirmation before a consequential action.", { deps: RADIX, reg: ["button"] }),
  ui("sheet", "Sheet", "Side and bottom panels for focused tasks.", { deps: [...RADIX, ...ICONS], reg: ["button"] }),
  ui("combobox", "Combobox", "Searchable single selection with accessible keyboard navigation.", { deps: ["react-aria-components", ...ICONS] }),
  ui("date-picker", "Date Picker", "Accessible date and date-range entry with a calendar popup.", { deps: ["react-aria-components", "@internationalized/date", ...ICONS] }),
  ui("input-group", "Input Group", "Inputs with leading units, icons and trailing actions.", { reg: ["input", "button"] }),
  ui("activity-feed", "Activity Feed", "A quiet, chronological list of events and timestamps."),
  ui("data-table", "Data Table", "A client-side table pattern with search, filters, sorting, selection and pagination.", { reg: ["table", "input", "native-select", "checkbox", "button", "skeleton"] }),
  ui("contribution-grid", "Contribution Grid", "A yearly activity calendar with neutral intensity levels and accessible daily counts."),
  ui("stat", "Stat", "KPI with tabular numerals and a signed delta.", { deps: CVA }),
  ui("badge", "Badge", "Status and metadata labels.", { deps: [...RADIX, ...CVA] }),
  ui("alert", "Alert", "Inline message about the state of a page or task.", { deps: CVA }),
  ui("avatar", "Avatar", "A person or workspace, as an image or initials.", { deps: [...RADIX, ...CVA] }),
  ui("tabs", "Tabs", "Switch between views of the same object.", { deps: RADIX }),
  ui("nav", "Nav", "Vertical navigation for app sidebars.", { deps: RADIX }),
  ui("breadcrumb", "Breadcrumb", "Where a page sits in a hierarchy.", { deps: [...RADIX, ...ICONS] }),
  ui("pagination", "Pagination", "Move through pages of results.", { deps: ICONS }),
  ui("dropdown-menu", "Dropdown Menu", "Actions or options anchored to a trigger.", { deps: [...RADIX, ...ICONS] }),
  ui("dialog", "Dialog", "Modal dialog with focus trap and an obvious way out.", { deps: [...RADIX, ...ICONS] }),
  ui("tooltip", "Tooltip", "A short hint on hover or focus.", { deps: RADIX }),
  ui("sonner", "Toast (Sonner)", "Brief, situational feedback after an action.", { deps: ["sonner", ...ICONS] }),
  ui("table", "Table", "Native table for dense data with aligned numbers.", { deps: ICONS }),
  ui("empty", "Empty", "Explains what is missing and offers one next step."),
  ui("skeleton", "Skeleton", "Placeholder that mirrors the real layout."),
  ui("spinner", "Spinner", "Inline loading indicator.", { deps: CVA }),
  ui("progress", "Progress", "Determinate progress bar.", { deps: RADIX }),
  ui("separator", "Separator", "A thin divider for when spacing alone is ambiguous.", { deps: RADIX }),
  ui("kbd", "Kbd", "Keyboard shortcut hint."),
  {
    name: "use-field",
    type: "registry:hook",
    title: "useField",
    description: "Stable IDs and explicit accessible associations for a field, description and error.",
    files: [{ path: "registry/hooks/use-field.ts", type: "registry:hook" }],
  },
  {
    name: "use-theme",
    type: "registry:hook",
    title: "useTheme",
    description: "Light / dark / system theme with the .dark class, persisted to localStorage.",
    files: [{ path: "registry/hooks/use-theme.ts", type: "registry:hook" }],
  },
  {
    ...ui("theme-switcher", "Theme Switcher", "System / Light / Dark segmented control.", { deps: ICONS, reg: ["segmented-control", "use-theme"] }),
  },
]

// One command for everything
items.push({
  name: "all",
  type: "registry:style",
  title: "Everything",
  description: "The theme and every component.",
  registryDependencies: items.map((i) => ns(i.name)),
  files: [],
})

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "aynsdev",
  homepage: "https://github.com/aynsdev/ui",
  items,
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(resolve(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n")
  writeFileSync(resolve(root, "registry/theme.css"), themeCss())
  console.log(`registry.json: ${items.length} items, registry/theme.css`)
  if (!process.argv.includes("--json")) {
    execSync("npx shadcn build", { cwd: root, stdio: "inherit" })
  }
}
