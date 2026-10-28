import * as React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSortButton } from "@/components/ui/table"

const rows = [
  { name: "Ada", sessions: 128 },
  { name: "Grace", sessions: 342 },
  { name: "Linus", sessions: 57 },
]

export default function TableSortable() {
  const [dir, setDir] = React.useState<"ascending" | "descending">("descending")
  const sorted = [...rows].sort((a, b) => (dir === "ascending" ? a.sessions - b.sessions : b.sessions - a.sessions))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead numeric aria-sort={dir}>
            <TableSortButton
              direction={dir}
              onClick={() => setDir(dir === "ascending" ? "descending" : "ascending")}
            >
              Sessions
            </TableSortButton>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((r) => (
          <TableRow key={r.name}>
            <TableCell>{r.name}</TableCell>
            <TableCell numeric>{r.sessions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
