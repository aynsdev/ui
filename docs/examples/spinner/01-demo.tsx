import { Spinner } from "@/components/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <span className="flex items-center gap-2">
        <Spinner size="sm" label="Syncing" />
        Syncing…
      </span>
    </div>
  )
}
