import { parseDate } from "@internationalized/date"
import { DatePicker } from "@/components/ui/date-picker"
export default function States() {
  return <div className="grid w-full max-w-sm gap-6"><DatePicker label="Read-only date" defaultValue={parseDate("2026-10-28")} isReadOnly /><DatePicker label="Unavailable date" isDisabled /><DatePicker label="Required date" isInvalid errorMessage="Choose a date on or after October 1." minValue={parseDate("2026-10-01")} /></div>
}
