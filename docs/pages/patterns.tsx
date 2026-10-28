import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { PageHeader, Section, P } from "./prose"

export function Patterns() {
  const [name, setName] = useState("Studio")
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState("")
  const [created, setCreated] = useState(false)
  const projects = ["Website", "Mobile app", "Design library"].filter(x => x.toLowerCase().includes(query.toLowerCase()))
  return <article className="min-w-0">
    <PageHeader eyebrow="Brand in practice" title="Calm, precise, approachable" description="Three working compositions built from the shared components." />
    <Section id="settings" title="Settings">
      <P>One surface groups related fields. Feedback stays with the action.</P>
      <Card><CardHeader><CardTitle>Workspace</CardTitle></CardHeader><CardContent>
        <form className="grid gap-5" onSubmit={e => { e.preventDefault(); setError(!name.trim()); setSaved(!!name.trim()) }}>
          <Field><FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel><Input id="workspace-name" value={name} aria-invalid={error} aria-describedby={error ? "name-error" : undefined} onChange={e => { setName(e.target.value); setSaved(false); setError(false) }} />{error && <FieldError id="name-error">Enter a workspace name, then save again.</FieldError>}</Field>
          <div className="flex flex-wrap items-center justify-between gap-3"><p role="status" className="text-sm text-muted-foreground">{saved ? "Changes saved for this preview." : "Changes apply to this preview."}</p><Button type="submit">Save changes</Button></div>
        </form>
      </CardContent></Card>
    </Section>
    <Section id="data" title="Project directory">
      <P>Compact spacing keeps the search and results together.</P>
      <Card density="compact"><CardHeader><CardTitle>Projects</CardTitle></CardHeader><CardContent className="grid gap-4">
        <Field><FieldLabel htmlFor="project-search">Search projects</FieldLabel><Input id="project-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name" /></Field>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Project directory</caption><thead><tr className="text-muted-foreground"><th scope="col" className="py-3 font-medium">Project</th><th scope="col" className="py-3 font-medium">Status</th><th scope="col" className="py-3 text-right font-medium">Members</th></tr></thead><tbody>{projects.map((project) => <tr key={project} className="border-t border-border"><th scope="row" className="py-3 font-medium">{project}</th><td className="py-3"><Badge>Active</Badge></td><td className="py-3 text-right tabular-nums">{({ Website: 4, "Mobile app": 6, "Design library": 2 } as Record<string, number>)[project]}</td></tr>)}</tbody></table></div>
        {!projects.length && <Empty><EmptyHeader><EmptyTitle>No matching projects</EmptyTitle><EmptyDescription>Try a different name or clear the search.</EmptyDescription></EmptyHeader><EmptyContent><Button variant="secondary" onClick={() => setQuery("")}>Clear search</Button></EmptyContent></Empty>}
      </CardContent></Card>
    </Section>
    <Section id="empty" title="First use">
      <Card><CardContent>{created ? <div role="status" className="grid gap-3 py-6"><h3 className="text-base font-semibold">Your first collection is ready</h3><p className="text-sm text-muted-foreground">Created locally for this preview.</p><Button variant="secondary" className="w-fit" onClick={() => setCreated(false)}>Reset preview</Button></div> : <Empty><EmptyHeader><EmptyTitle>No collections yet</EmptyTitle><EmptyDescription>Keep related projects together in a collection.</EmptyDescription></EmptyHeader><EmptyContent><Button onClick={() => setCreated(true)}>Create collection</Button></EmptyContent></Empty>}</CardContent></Card>
    </Section>
  </article>
}
