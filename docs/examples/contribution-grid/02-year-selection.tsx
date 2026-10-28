import * as React from "react"
import { ContributionGrid } from "@/components/ui/contribution-grid"
import { NativeSelect } from "@/components/ui/native-select"

export default function YearSelection() {
  const [year, setYear] = React.useState(2025)
  const data = Array.from({ length: 90 }, (_, index) => ({
    date: new Date(Date.UTC(year, 0, index + 1)).toISOString().slice(0, 10),
    count: (index * 7 + year) % 12,
  }))

  return (
    <div className="grid w-full min-w-0 gap-4">
      <NativeSelect aria-label="Contribution year" value={year} onChange={(event) => setYear(Number(event.target.value))} className="w-fit justify-self-end">
        <option value={2025}>2025</option>
        <option value={2024}>2024</option>
      </NativeSelect>
      <ContributionGrid year={year} data={data} />
    </div>
  )
}
