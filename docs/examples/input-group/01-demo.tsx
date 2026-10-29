import * as React from "react"
import { EyeIcon, EyeOffIcon, SearchIcon } from "lucide-react"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { useField } from "@/hooks/use-field"
export default function Demo() {
  const [visible, setVisible] = React.useState(false)
  const password = useField(), search = useField(), amount = useField()
  return <div className="grid w-full max-w-sm gap-6">
    <Field><FieldLabel {...search.labelProps}>Search projects</FieldLabel><InputGroup><InputGroupAddon aria-hidden="true"><SearchIcon /></InputGroupAddon><InputGroupInput {...search.controlProps} type="search" placeholder="Project name…" /></InputGroup></Field>
    <Field><FieldLabel {...amount.labelProps}>Budget in USD</FieldLabel><InputGroup><InputGroupAddon aria-hidden="true">$</InputGroupAddon><InputGroupInput {...amount.controlProps} type="number" min={0} step="0.01" placeholder="0.00" /></InputGroup></Field>
    <Field><FieldLabel {...password.labelProps}>Password</FieldLabel><InputGroup><InputGroupInput {...password.controlProps} type={visible ? "text" : "password"} autoComplete="new-password" /><InputGroupButton aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? <EyeOffIcon /> : <EyeIcon />}</InputGroupButton></InputGroup></Field>
  </div>
}
