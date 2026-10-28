import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div className="grid max-w-xs gap-1.5">
      <Label htmlFor="workspace">Workspace name</Label>
      <Input id="workspace" placeholder="Acme" />
    </div>
  )
}
