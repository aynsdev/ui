import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldErrorExample() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="field-domain">Domain</FieldLabel>
      <Input id="field-domain" defaultValue="acme" aria-invalid aria-describedby="field-domain-error" />
      <FieldError id="field-domain-error">Enter a full domain, like acme.com.</FieldError>
    </Field>
  )
}
