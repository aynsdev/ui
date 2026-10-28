import * as React from "react"

import { cn } from "@/lib/utils"

type Contribution = { date: string; count: number }
type ContributionGridProps = React.ComponentProps<"figure"> & {
  /** Calendar year, from 1000 to 9999. Dates use YYYY-MM-DD, without a timezone. */
  year: number
  data: Contribution[]
  label?: string
}

const DAY = 86_400_000
const levels = ["fill-secondary", "fill-foreground/25", "fill-foreground/45", "fill-foreground/70", "fill-foreground"]

/** Calendar arithmetic is UTC-based so DST and local time cannot shift a cell. */
function contributionDays(year: number, data: Contribution[]) {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new RangeError("ContributionGrid year must be an integer from 1000 to 9999.")
  }
  const counts = new Map<string, number>()
  for (const { date, count } of data) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isSafeInteger(count) || count < 0) continue
    counts.set(date, count) // Duplicate dates use the last value.
  }
  const start = Date.UTC(year, 0, 1)
  const end = Date.UTC(year + 1, 0, 1)
  return Array.from({ length: (end - start) / DAY }, (_, index) => {
    const date = new Date(start + index * DAY).toISOString().slice(0, 10)
    return { date, count: counts.get(date) ?? 0 }
  })
}

function ContributionGrid({ year, data, label = "Contributions", className, ...props }: ContributionGridProps) {
  const id = React.useId()
  const days = contributionDays(year, data)
  const offset = new Date(Date.UTC(year, 0, 1)).getUTCDay()
  const weeks = Math.ceil((days.length + offset) / 7)
  const total = days.reduce((sum, day) => sum + day.count, 0)
  const maximum = Math.max(0, ...days.map((day) => day.count))
  const active = days.filter((day) => day.count > 0).length
  const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" })
  const level = (count: number) => count === 0 ? 0 : Math.ceil(count / maximum * 4)

  return (
    <figure data-slot="contribution-grid" className={cn("grid w-full min-w-0 gap-4 rounded-3xl bg-card p-6 text-card-foreground", className)} {...props}>
      <figcaption id={`${id}-caption`} className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-base font-semibold text-balance">{label}</span>
        <span className="text-sm tabular-nums text-muted-foreground">{year}</span>
      </figcaption>
      <p className="text-sm tabular-nums text-pretty">
        {total.toLocaleString("en")} contribution{total === 1 ? "" : "s"}
        <span className="text-muted-foreground"> across {active} active day{active === 1 ? "" : "s"}</span>
      </p>
      <div role="region" aria-label={`${label} calendar, scroll horizontally to see the full year`} tabIndex={0} className="overflow-x-auto rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg role="img" aria-labelledby={`${id}-title ${id}-description`} viewBox={`0 0 ${40 + weeks * 16} 140`} className="block w-full min-w-xl font-sans text-xs">
          <title id={`${id}-title`}>{label} in {year}</title>
          <desc id={`${id}-description`}>{total} contributions across {active} active days. Stronger intensity indicates more contributions relative to the busiest day ({maximum}). Exact daily counts are available in View daily counts below.</desc>
          {Array.from({ length: 12 }, (_, month) => {
            const index = (Date.UTC(year, month, 1) - Date.UTC(year, 0, 1)) / DAY
            const column = Math.floor((index + offset) / 7)
            return <text key={month} x={40 + column * 16} y={12} className="fill-muted-foreground">{new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(year, month, 1)))}</text>
          })}
          {["", "Mon", "", "Wed", "", "Fri", ""].map((day, index) => day && <text key={day} x={0} y={34 + index * 16} className="fill-muted-foreground">{day}</text>)}
          {days.map((day, index) => (
            <rect key={day.date} data-date={day.date} data-level={level(day.count)} x={40 + Math.floor((index + offset) / 7) * 16} y={24 + ((index + offset) % 7) * 16} width={12} height={12} rx={3} className={cn(levels[level(day.count)], "hover:stroke-foreground")}>
              <title>{dateFormat.format(new Date(`${day.date}T00:00:00Z`))}: {day.count} contribution{day.count === 1 ? "" : "s"}</title>
            </rect>
          ))}
        </svg>
      </div>
      <div aria-hidden="true" className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <svg width={76} height={12} className="shrink-0">{levels.map((fill, index) => <rect key={fill} x={index * 16} width={12} height={12} rx={3} className={fill} />)}</svg>
        <span>More</span>
      </div>
      <details data-slot="contribution-grid-details" className="text-sm">
        <summary className="w-fit cursor-pointer rounded-sm py-2 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">View daily counts</summary>
        <div role="region" aria-label="Daily contribution counts" tabIndex={0} className="mt-2 max-h-64 overflow-auto rounded-xl bg-secondary p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <table className="w-full text-left text-xs tabular-nums">
            <caption className="sr-only">{label} by date in {year}</caption>
            <thead><tr><th scope="col" className="pb-2 font-semibold">Date</th><th scope="col" className="pb-2 text-right font-semibold">Contributions</th></tr></thead>
            <tbody>{days.map((day) => <tr key={day.date}><th scope="row" className="py-1 font-medium">{day.date}</th><td className="py-1 text-right">{day.count.toLocaleString("en")}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
    </figure>
  )
}

export { ContributionGrid, contributionDays }
export type { Contribution, ContributionGridProps }
