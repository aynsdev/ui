import * as React from "react"
import { useField } from "@/hooks/use-field"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function AssociatedFields() {
  const [name, setName] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const description = "Use a name your team will recognize."
  const error = submitted && !name.trim() ? "Enter a project name." : undefined
  const field = useField({ description, error })
  return <form className="grid w-full max-w-sm gap-4" noValidate onSubmit={event => { event.preventDefault(); setSubmitted(true) }}><Field><FieldLabel {...field.labelProps}>Project name</FieldLabel><Input {...field.controlProps} value={name} onChange={event => setName(event.target.value)} /><FieldDescription {...field.descriptionProps}>{description}</FieldDescription><FieldError {...field.errorProps}>{error}</FieldError></Field><Button type="submit" className="justify-self-start">Validate</Button>{submitted && !error && <p role="status" className="text-sm">Project name is valid.</p>}</form>
}
