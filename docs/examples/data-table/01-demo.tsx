import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
type Project = { id: string; name: string; status: string; members: number }
const projects: Project[] = [
  { id: "1", name: "Design system", status: "Active", members: 8 },
  { id: "2", name: "Website", status: "Active", members: 12 },
  { id: "3", name: "Mobile app", status: "Paused", members: 6 },
  { id: "4", name: "Customer portal", status: "Active", members: 4 },
  { id: "5", name: "Internal tools", status: "Paused", members: 3 },
  { id: "6", name: "Documentation", status: "Active", members: 2 },
]
const columns: DataTableColumn<Project>[] = [
  { id: "name", header: "Project", cell: row => row.name, sortValue: row => row.name },
  { id: "status", header: "Status", cell: row => <Badge>{row.status}</Badge>, sortValue: row => row.status },
  { id: "members", header: "Members", cell: row => row.members, sortValue: row => row.members, numeric: true },
]
export default function Demo() {
  return <DataTable className="w-full" label="Projects" data={projects} columns={columns} getRowId={row => row.id} getRowLabel={row => row.name} searchText={row => row.name} pageSize={3} selectable filters={[{ value: "active", label: "Active", matches: row => row.status === "Active" }, { value: "paused", label: "Paused", matches: row => row.status === "Paused" }]} />
}
