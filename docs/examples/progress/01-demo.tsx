import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex justify-between text-sm">
        <span>Storage</span>
        <span className="text-muted-foreground tabular-nums">6.4 of 10 GB</span>
      </div>
      <Progress value={64} aria-label="Storage used" />
    </div>
  )
}
