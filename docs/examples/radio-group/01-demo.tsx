import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing period">
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="monthly" id="monthly" />
        <Label htmlFor="monthly">Monthly</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="yearly" id="yearly" />
        <Label htmlFor="yearly">Yearly (2 months free)</Label>
      </div>
    </RadioGroup>
  )
}
