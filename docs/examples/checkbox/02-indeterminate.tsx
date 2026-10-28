import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const items = ["Invoices", "Receipts", "Payouts"]

export default function CheckboxIndeterminate() {
  const [checked, setChecked] = React.useState<string[]>(["Invoices"])
  const all = checked.length === items.length ? true : checked.length ? "indeterminate" : false

  return (
    <div className="grid gap-2.5">
      <div className="flex items-center gap-2.5">
        <Checkbox id="all" checked={all} onCheckedChange={(v) => setChecked(v === true ? items : [])} />
        <Label htmlFor="all">All documents</Label>
      </div>
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2.5 pl-6">
          <Checkbox
            id={item}
            checked={checked.includes(item)}
            onCheckedChange={(v) => setChecked((c) => (v === true ? [...c, item] : c.filter((x) => x !== item)))}
          />
          <Label htmlFor={item}>{item}</Label>
        </div>
      ))}
    </div>
  )
}
