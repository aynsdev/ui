import { CodeBlock } from "../components/code-block"
import { PackageManagerCommand } from "../components/install-tabs"
import { componentsJsonSnippet } from "../lib/markdown"
import { P, PageHeader, Section } from "./prose"

export function Installation() {
  return (
    <article className="min-w-0">
      <PageHeader
        eyebrow="Getting started"
        title="Installation"
        description="Components are installed with the shadcn CLI from the @aynsdev registry. They work in any React project that uses Tailwind CSS v4: Next.js, Vite, Remix, Astro."
      />

      <Section id="init" title="1. Set up shadcn/ui">
        <P>
          Skip this if your project already has a <code>components.json</code>. Otherwise follow the{" "}
          <a className="text-foreground underline underline-offset-3" href="https://ui.shadcn.com/docs/installation" target="_blank" rel="noreferrer">
            shadcn installation guide
          </a>{" "}
          for your framework, or run:
        </P>
        <CodeBlock code="npx shadcn@latest init" />
      </Section>

      <Section id="registry" title="2. Add the registry">
        <P>
          Add the <code>@aynsdev</code> namespace to <code>components.json</code>, next to the keys that are already there.
        </P>
        <CodeBlock title="components.json" code={componentsJsonSnippet} />
      </Section>

      <Section id="add" title="3. Add the theme and components">
        <P>
          Install everything at once. This writes the theme to your global CSS, replacing the default colours, and copies every component to{" "}
          <code>components/ui</code>.
        </P>
        <PackageManagerCommand items={["all"]} />
        <P>Or start with the theme and add components as you need them. Each component also installs the theme.</P>
        <PackageManagerCommand items={["theme", "button", "card"]} />
      </Section>

      <Section id="fonts" title="4. Load Inter">
        <P>
          The theme sets <code>--font-sans</code> to Inter (variable, weights 400–800) and falls back to Geist and the system font. In Next.js use{" "}
          <code>next/font</code>; elsewhere load it from Google Fonts or <code>@fontsource-variable/inter</code>.
        </P>
        <CodeBlock
          title="app/layout.tsx"
          code={`import { Geist_Mono, Inter } from "next/font/google"

const sans = Inter({ subsets: ["latin"], variable: "--font-inter" })
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

// <html className={\`\${sans.variable} \${mono.variable}\`}>`}
        />
        <P>
          With <code>next/font</code>, point the theme at the variables: <code>--font-sans: var(--font-inter)</code> in the <code>@theme inline</code> block.
        </P>
      </Section>

      <Section id="dark-mode" title="5. Dark mode">
        <P>
          Dark values apply under a <code>.dark</code> class on <code>&lt;html&gt;</code>, the shadcn convention. Use <code>next-themes</code> if you already have it, or add the{" "}
          <a className="text-foreground underline underline-offset-3" href="#/components/theme-switcher">
            Theme Switcher
          </a>
          , which brings its own <code>useTheme</code> hook.
        </P>
      </Section>
    </article>
  )
}
