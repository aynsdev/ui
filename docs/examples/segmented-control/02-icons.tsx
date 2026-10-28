import { LayoutGridIcon, ListIcon } from "lucide-react"

import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

export default function SegmentedControlIcons() {
  return (
    <SegmentedControl aria-label="Layout" size="sm" defaultValue="grid">
      <SegmentedControlItem value="grid" aria-label="Grid">
        <LayoutGridIcon />
      </SegmentedControlItem>
      <SegmentedControlItem value="list" aria-label="List">
        <ListIcon />
      </SegmentedControlItem>
    </SegmentedControl>
  )
}
