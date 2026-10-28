import { Input } from "@/components/ui/input"

export default function InputStates() {
  return (
    <div className="grid max-w-xs gap-3">
      <Input placeholder="Default" aria-label="Default" />
      <Input placeholder="Invalid" aria-label="Invalid" aria-invalid />
      <Input placeholder="Disabled" aria-label="Disabled" disabled />
    </div>
  )
}
