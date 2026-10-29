import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
export default function States() {
  const [state, setState] = React.useState("loading")
  return <div className="grid w-full gap-6"><SegmentedControl aria-label="Table state" value={state} onValueChange={setState}><SegmentedControlItem value="loading">Loading</SegmentedControlItem><SegmentedControlItem value="error">Error</SegmentedControlItem><SegmentedControlItem value="empty">Empty</SegmentedControlItem></SegmentedControl><DataTable<{ id: string }> label="Sample records" data={state === "ready" ? [{ id: "New record" }] : []} columns={[{ id: "id", header: "Record", cell: row => row.id }]} getRowId={row => row.id} getRowLabel={row => row.id} loading={state === "loading"} error={state === "error" ? "Could not load sample records." : undefined} onRetry={() => setState("ready")} emptyAction={<Button size="sm" variant="secondary" className="mt-3" onClick={() => setState("ready")}>Add sample record</Button>} /></div>
}
