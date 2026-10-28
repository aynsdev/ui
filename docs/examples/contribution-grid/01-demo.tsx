import { ContributionGrid } from "@/components/ui/contribution-grid"

// Deterministic sample data; replace with contributions from your data source.
const data = Array.from({ length: 365 }, (_, index) => ({
  date: new Date(Date.UTC(2025, 0, index + 1)).toISOString().slice(0, 10),
  count: index % 7 === 0 || index % 11 === 0 ? 0 : (index * 13 + Math.floor(index / 7) * 3) % 17,
}))

export default function Demo() {
  return <ContributionGrid year={2025} data={data} label="Contribution activity" />
}
