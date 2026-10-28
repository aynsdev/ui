import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm text-sm">
      <p className="font-medium">Acme Inc.</p>
      <p className="text-muted-foreground">Workspace settings</p>
      <Separator className="my-4" />
      <div className="flex h-4 items-center gap-3 text-muted-foreground">
        <span>Members</span>
        <Separator orientation="vertical" />
        <span>Billing</span>
        <Separator orientation="vertical" />
        <span>Security</span>
      </div>
    </div>
  )
}
