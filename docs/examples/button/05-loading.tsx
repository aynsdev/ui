import * as React from "react"

import { Button } from "@/components/ui/button"

export default function ButtonLoading() {
  const [saving, setSaving] = React.useState(false)

  function save() {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <Button loading={saving} onClick={save}>
      Save changes
    </Button>
  )
}
