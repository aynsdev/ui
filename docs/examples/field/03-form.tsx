import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"

export default function FieldForm() {
  return (
    <form className="grid max-w-md gap-6" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>Invite a teammate</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="invite-email">Email</FieldLabel>
            <Input id="invite-email" type="email" placeholder="name@company.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="invite-role">Role</FieldLabel>
            <NativeSelect id="invite-role" defaultValue="member">
              <NativeSelectOption value="admin">Admin</NativeSelectOption>
              <NativeSelectOption value="member">Member</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field orientation="horizontal">
            <Switch id="invite-notify" defaultChecked />
            <FieldContent>
              <FieldLabel htmlFor="invite-notify">Send a welcome email</FieldLabel>
              <FieldDescription>Includes a link to set a password.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost">Cancel</Button>
        <Button type="submit">Send invite</Button>
      </div>
    </form>
  )
}
