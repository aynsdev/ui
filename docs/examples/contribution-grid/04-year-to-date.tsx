import { ContributionGrid } from "@/components/ui/contribution-grid"
export default function YearToDate() {
  return <ContributionGrid year={2026} endDate="2026-10-28" locale="en-GB" thresholds={[3, 6, 9]} data={[{ date: "2026-10-26", count: 3 }, { date: "2026-10-27", count: 7 }, { date: "2026-10-28", count: 12 }]} />
}
