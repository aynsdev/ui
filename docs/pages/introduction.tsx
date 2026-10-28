import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyMenu } from "../components/copy-menu"
import { PackageManagerCommand } from "../components/install-tabs"
import { systemMarkdown, systemPrompt } from "../lib/markdown"
import { components, groups } from "../lib/registry"
import { href } from "../lib/router"
import { P, PageHeader, Section } from "./prose"

const principles = [
  ["Quiet surfaces", "Neutral greys and filled surfaces instead of lines and shadows. Hierarchy comes from type, weight and space."],
  ["Soft, confident shapes", "Pill-shaped actions, 24px cards and medium-weight type. Friendly without being playful."],
  ["Yours to edit", "Components are copied into your project with the shadcn CLI. Change them like any other file."],
] as const

export function Introduction() {
  return (
    <article className="min-w-0">
      <PageHeader
        eyebrow="Introduction"
        title="A minimalist design system, distributed as a shadcn registry"
        description="Theme tokens and accessible React components built on Radix, Tailwind v4 and cva. Install them into any shadcn project, then own the code."
        actions={<CopyMenu label="Copy system" markdown={systemMarkdown} prompt={systemPrompt} />}
      />

      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <a href={href({ page: "installation" })}>
            Get started
            <ArrowRightIcon />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={href({ page: "component", id: "button" })}>Browse components</a>
        </Button>
      </div>

      <Section id="install-all" title="Install everything">
        <P>
          After <a className="text-foreground underline underline-offset-3" href={href({ page: "installation" })}>adding the registry</a> to{" "}
          <code>components.json</code>, one command installs the theme and every component.
        </P>
        <PackageManagerCommand items={["all"]} />
      </Section>

      <Section id="principles" title="Principles">
        <div className="grid gap-3 sm:grid-cols-3">
          {principles.map(([title, body]) => (
            <Card key={title} className="gap-0">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="leading-relaxed">{body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="components" title="Components">
        <div className="grid gap-8">
          {groups.map((g) => (
            <div key={g} className="grid gap-3">
              <h3 className="text-[13px] font-medium text-muted-foreground">{g}</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {components
                  .filter((c) => c.group === g)
                  .map((c) => (
                    <Card key={c.id} interactive asChild className="gap-0 py-4">
                      <a href={href({ page: "component", id: c.id })}>
                        <CardHeader className="px-4">
                          <CardTitle className="flex items-center gap-2">
                            {c.title}
                            {c.examples.length > 1 && (
                              <Badge size="sm" variant="outline">
                                {c.examples.length} examples
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{c.description}</CardDescription>
                        </CardHeader>
                      </a>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </article>
  )
}
