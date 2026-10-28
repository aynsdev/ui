import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function KbdDemo() {
  return (
    <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      Open the command menu with
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </p>
  )
}
