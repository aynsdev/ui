import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Draft</Badge>
      <Badge variant="outline">v2.4</Badge>
      <Badge variant="solid">New</Badge>
      <Badge variant="brand">Pro</Badge>
    </div>
  )
}
