import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3" aria-busy="true" aria-label="Loading profile">
      <Skeleton className="size-10 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  )
}
