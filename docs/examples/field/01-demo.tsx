import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldDemo() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" type="email" placeholder="you@company.com" />
      <FieldDescription>We only use this for sign-in and receipts.</FieldDescription>
    </Field>
  )
}
