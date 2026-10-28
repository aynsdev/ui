import { ContributionGrid } from "@/components/ui/contribution-grid"

export default function EmptyYear() {
  return <ContributionGrid year={2026} data={[]} label="No contributions yet" />
}
