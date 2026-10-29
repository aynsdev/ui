import { parseDate } from "@internationalized/date"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
export default function Demo() {
  return <div className="grid w-full max-w-md gap-6"><DatePicker label="Due date" defaultValue={parseDate("2026-10-28")} /><DateRangePicker label="Reporting period" defaultValue={{ start: parseDate("2026-10-01"), end: parseDate("2026-10-28") }} description="Select a start and end date." /></div>
}
