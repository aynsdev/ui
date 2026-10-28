import { Card, CardContent } from "@/components/ui/card"
import { Stat, StatDelta, StatLabel, StatValue } from "@/components/ui/stat"

const stats = [
  { label: "Revenue", value: "₱482,900", delta: "+12.4%", trend: "up" },
  { label: "Active customers", value: "1,284", delta: "+38", trend: "up" },
  { label: "Refund rate", value: "1.9%", delta: "−0.3 pts", trend: "neutral" },
] as const

export default function StatDemo() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent>
            <Stat>
              <StatLabel>{s.label}</StatLabel>
              <StatValue>{s.value}</StatValue>
              <StatDelta trend={s.trend} sentiment="positive">{s.delta} vs last month</StatDelta>
            </Stat>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
