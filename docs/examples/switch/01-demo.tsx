import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-2.5">
      <Switch id="autosave" defaultChecked />
      <Label htmlFor="autosave">Autosave drafts</Label>
    </div>
  )
}
