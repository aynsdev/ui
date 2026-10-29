import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { useField } from "@/hooks/use-field"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
export default function Demo() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Design system")
  const [saved, setSaved] = React.useState(false)
  const field = useField()
  return <div className="grid justify-items-center gap-3"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="secondary">Edit project</Button></SheetTrigger><SheetContent>
    <SheetHeader><SheetTitle>Edit project</SheetTitle><SheetDescription>Update the name used throughout your workspace.</SheetDescription></SheetHeader>
    <form className="flex flex-1 flex-col gap-6" onSubmit={event => { event.preventDefault(); setSaved(true); setOpen(false) }}>
      <Field><FieldLabel {...field.labelProps}>Project name</FieldLabel><Input {...field.controlProps} required value={name} onChange={event => setName(event.target.value)} /></Field>
      <SheetFooter><SheetClose asChild><Button type="button" variant="secondary">Cancel</Button></SheetClose><Button type="submit">Save changes</Button></SheetFooter>
    </form>
  </SheetContent></Sheet>{saved && <p role="status" className="text-sm text-muted-foreground">Saved “{name}”.</p>}</div>
}
