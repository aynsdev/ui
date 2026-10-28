import { Badge } from "@/components/ui/badge"

export default function BadgeStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" dot>Paid</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="destructive" dot>Failed</Badge>
      <Badge variant="info" dot>Scheduled</Badge>
      <Badge variant="success" size="sm">Live</Badge>
    </div>
  )
}
