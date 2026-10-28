import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const invoices = [
  { id: "INV-1042", customer: "Northwind", status: "Paid", amount: "₱12,400.00" },
  { id: "INV-1041", customer: "Globex", status: "Pending", amount: "₱3,150.00" },
  { id: "INV-1040", customer: "Initech", status: "Failed", amount: "₱880.00" },
] as const

const tone = { Paid: "success", Pending: "warning", Failed: "destructive" } as const

export default function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead numeric>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>{inv.customer}</TableCell>
            <TableCell>
              <Badge variant={tone[inv.status]} dot>{inv.status}</Badge>
            </TableCell>
            <TableCell numeric>{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
