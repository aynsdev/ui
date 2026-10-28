import * as React from "react"

import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

export default function SegmentedControlDemo() {
  const [view, setView] = React.useState("list")

  return (
    <SegmentedControl aria-label="View" value={view} onValueChange={setView}>
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="board">Board</SegmentedControlItem>
      <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
    </SegmentedControl>
  )
}
