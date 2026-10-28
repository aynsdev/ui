import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CodeBlock } from "../components/code-block"
import { ComponentPreview } from "../components/component-preview"
import { CopyMenu } from "../components/copy-menu"
import { InstallTabs } from "../components/install-tabs"
import { componentMarkdown, componentPrompt } from "../lib/markdown"
import { components, type ComponentEntry } from "../lib/registry"
import { href } from "../lib/router"
import { P, PageHeader, Section } from "./prose"

export function ComponentPage({ entry }: { entry: ComponentEntry }) {
  const [demo, ...examples] = entry.examples
  const index = components.indexOf(entry)
  const prev = components[index - 1]
  const next = components[index + 1]

  return (
    <article className="min-w-0">
      <PageHeader
        eyebrow={entry.group}
        title={entry.title}
        description={entry.description}
        actions={<CopyMenu markdown={() => componentMarkdown(entry)} prompt={(agent) => componentPrompt(entry, agent)} />}
      />

      {demo && <ComponentPreview example={demo} />}

      <Section id="installation" title="Installation">
        <InstallTabs
          name={entry.id}
          dependencies={entry.dependencies}
          registryDependencies={entry.registryDependencies}
          files={entry.files}
        />
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock code={entry.usage} />
      </Section>

      {examples.length > 0 && (
        <Section id="examples" title="Examples">
          <div className="grid min-w-0 gap-10">
            {examples.map((ex) => (
              <div key={ex.slug} id={`example-${ex.slug}`} className="grid min-w-0 gap-3">
                <h3 className="text-[15px] font-semibold">{ex.title}</h3>
                <ComponentPreview example={ex} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section id="guidelines" title="Guidelines">
        <ul className="grid max-w-2xl gap-2.5 text-sm leading-relaxed text-muted-foreground">
          {entry.guidelines.map((g) => (
            <li key={g} className="relative pl-4 before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-border-strong">
              {g}
            </li>
          ))}
        </ul>
      </Section>

      {(entry.api?.length || entry.primitive) && (
        <Section id="api" title="API reference">
          {entry.api?.map((part) => (
            <div key={part.name} className="grid min-w-0 gap-3">
              <h3 className="font-mono text-[13px] font-medium">{part.name}</h3>
              {part.props.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prop</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Default</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {part.props.map((p) => (
                      <TableRow key={p.name}>
                        <TableCell className="font-mono text-[12.5px]">{p.name}</TableCell>
                        <TableCell className="max-w-64 font-mono text-[12px] whitespace-normal text-muted-foreground">{p.type}</TableCell>
                        <TableCell className="font-mono text-[12px] text-muted-foreground">{p.default ?? "–"}</TableCell>
                        <TableCell className="min-w-56 whitespace-normal text-muted-foreground">{p.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <P>Accepts the props of the element it renders.</P>
              )}
            </div>
          ))}
          {entry.primitive && (
            <P>
              Other props are passed through to{" "}
              <a href={entry.primitive.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-foreground underline underline-offset-3">
                {entry.primitive.name}
                <ArrowUpRightIcon className="size-3" />
              </a>
              .
            </P>
          )}
        </Section>
      )}

      <nav aria-label="Pagination" className="mt-14 flex justify-between gap-4 border-t border-border pt-6">
        {prev ? (
          <Button variant="ghost" asChild>
            <a href={href({ page: "component", id: prev.id })}>
              <ArrowLeftIcon />
              {prev.title}
            </a>
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button variant="ghost" asChild>
            <a href={href({ page: "component", id: next.id })}>
              {next.title}
              <ArrowRightIcon />
            </a>
          </Button>
        )}
      </nav>
    </article>
  )
}
