import * as React from "react"
import { Combobox } from "@/components/ui/combobox"
const options = [{ id: "design", label: "Design system" }, { id: "website", label: "Website" }, { id: "mobile", label: "Mobile app" }, { id: "archive", label: "Archived workspace", disabled: true }]
export default function Demo() {
  const [selectedKey, setSelectedKey] = React.useState<string | number | null>(null)
  return <div className="grid w-full max-w-sm gap-4"><Combobox label="Project" options={options} selectedKey={selectedKey} onSelectionChange={setSelectedKey} description="Search by project name." /><p role="status" className="text-xs text-muted-foreground">{selectedKey ? `Selected: ${options.find(option => option.id === selectedKey)?.label}` : "No project selected."}</p></div>
}
