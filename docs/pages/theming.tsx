import { CodeBlock } from "../components/code-block"
import { themeCss } from "../lib/registry"
import { P, PageHeader, Section } from "./prose"

const swatches = [
  ["background", "Page"],
  ["card", "Surfaces"],
  ["secondary", "Quiet fills"],
  ["accent", "Hover"],
  ["border", "Edges"],
  ["border-strong", "Emphasis"],
  ["muted-foreground", "Secondary text"],
  ["foreground", "Text"],
  ["primary", "Primary"],
  ["ring", "Focus"],
  ["success", "Success"],
  ["warning", "Warning"],
  ["destructive", "Destructive"],
  ["info", "Info"],
] as const

export function Theming() {
  return (
    <article className="min-w-0">
      <PageHeader
        eyebrow="Getting started"
        title="Theming"
        description="The identity lives in CSS variables using shadcn's names, plus a few extras for status colours, stronger borders and elevation. Components only read tokens, so changing a value changes every component."
      />

      <Section id="tokens" title="Colour tokens">
        <P>Shown in the current theme. Switch themes in the header to compare.</P>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {swatches.map(([name, label]) => (
            <div key={name} className="grid gap-1.5">
              <div className="h-14 rounded-lg border border-border" style={{ background: `var(--${name})` }} />
              <div className="text-xs font-medium">{label}</div>
              <div className="font-mono text-[11px] text-muted-foreground">--{name}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="extras" title="Extra utilities">
        <P>
          Beyond the shadcn set, the theme registers <code>text-subtle-foreground</code>, <code>border-border-strong</code>, <code>bg-pressed</code>,{" "}
          <code>success</code> / <code>warning</code> / <code>info</code> / <code>brand</code> colours, <code>bg-overlay</code>, and the{" "}
          <code>shadow-popover</code> and <code>shadow-dialog</code> elevations. Status colours are meant for text and tints: <code>text-success</code>,{" "}
          <code>bg-success/12</code>.
        </P>
      </Section>

      <Section id="css" title="Theme CSS">
        <P>
          <code>npx shadcn@latest add @aynsdev/theme</code> writes these values into your global CSS. To install by hand, add this after{" "}
          <code>@import "tailwindcss"</code>, <code>@import "tw-animate-css"</code> and <code>@custom-variant dark (&amp;:is(.dark *))</code>.
        </P>
        <CodeBlock title="globals.css" code={themeCss} collapsible />
      </Section>

      <Section id="customise" title="Customise per project">
        <P>
          Override variables after the theme, for example a brand colour for marketing calls to action and a different radius. The <code>brand</code> button
          and badge variants follow <code>--brand</code>.
        </P>
        <CodeBlock
          title="globals.css"
          code={`:root {
  --brand: #3b5bdb;
  --brand-foreground: #ffffff;
  --radius: 0.5rem;
}

.dark {
  --brand: #91a7ff;
  --brand-foreground: #101113;
}`}
        />
      </Section>
    </article>
  )
}
