"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSortButton } from "@/components/ui/table"
import { cn } from "@/lib/utils"

type DataTableColumn<T> = {
  id: string
  header: string
  cell: (row: T) => React.ReactNode
  sortValue?: (row: T) => string | number
  numeric?: boolean
}
type DataTableProps<T> = {
  data: T[]
  columns: DataTableColumn<T>[]
  getRowId: (row: T) => string
  getRowLabel: (row: T) => string
  label: string
  searchText?: (row: T) => string
  filters?: { value: string; label: string; matches: (row: T) => boolean }[]
  pageSize?: number
  selectable?: boolean
  onSelectionChange?: (ids: string[]) => void
  loading?: boolean
  error?: string
  onRetry?: () => void
  emptyAction?: React.ReactNode
  className?: string
}

/** Client-side pattern for modest datasets. Server pagination belongs in a consuming application. */
function DataTable<T>({ data, columns, getRowId, getRowLabel, label, searchText, filters = [], pageSize = 10, selectable = false, onSelectionChange, loading = false, error, onRetry, emptyAction, className }: DataTableProps<T>) {
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState("")
  const [sort, setSort] = React.useState<{ id: string; direction: "ascending" | "descending" } | null>(null)
  const [page, setPage] = React.useState(0)
  const [selection, setSelection] = React.useState<Set<string>>(new Set())
  const filterRule = filters.find(item => item.value === filter)
  const rows = data.filter(row => (!searchText || searchText(row).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) && (!filterRule || filterRule.matches(row)))
  const column = columns.find(item => item.id === sort?.id)
  if (column?.sortValue && sort) {
    const value = column.sortValue
    rows.sort((a, b) => {
      const left = value(a), right = value(b)
      const result = typeof left === "number" && typeof right === "number" ? left - right : String(left).localeCompare(String(right), undefined, { numeric: true })
      return sort.direction === "ascending" ? result : -result
    })
  }
  const size = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : 10
  const pages = Math.max(1, Math.ceil(rows.length / size))
  const currentPage = Math.min(page, pages - 1)
  const visibleRows = rows.slice(currentPage * size, (currentPage + 1) * size)
  const selected = new Set(data.map(getRowId).filter(id => selection.has(id)))
  const allChecked = visibleRows.length > 0 && visibleRows.every(row => selected.has(getRowId(row)))
  const someChecked = visibleRows.some(row => selected.has(getRowId(row)))
  const updateSelection = (ids: string[], checked: boolean) => {
    const next = new Set(selected)
    for (const id of ids) { if (checked) next.add(id); else next.delete(id) }
    setSelection(next)
    onSelectionChange?.([...next])
  }
  const busy = loading || Boolean(error)
  return <section data-slot="data-table" aria-label={label} aria-busy={loading || undefined} className={cn("grid min-w-0 gap-4", className)}>
    {(searchText || filters.length > 0) && <div className="flex flex-wrap items-center gap-3">
      {searchText && <Input type="search" aria-label={`Search ${label}`} placeholder="Search…" value={query} onChange={event => { setQuery(event.target.value); setPage(0) }} className="min-w-40 flex-1" />}
      {filters.length > 0 && <NativeSelect aria-label={`Filter ${label}`} value={filter} onChange={event => { setFilter(event.target.value); setPage(0) }} className="w-fit"><option value="">All records</option>{filters.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</NativeSelect>}
    </div>}
    <Table aria-label={label}>
      <TableHeader><TableRow>
        {selectable && <TableHead><Checkbox aria-label="Select all rows on this page" disabled={busy || !visibleRows.length} checked={allChecked ? true : someChecked ? "indeterminate" : false} onCheckedChange={checked => updateSelection(visibleRows.map(getRowId), checked === true)} /></TableHead>}
        {columns.map(item => <TableHead key={item.id} scope="col" numeric={item.numeric} aria-sort={item.sortValue ? sort?.id === item.id ? sort.direction : "none" : undefined}>
          {item.sortValue ? <TableSortButton disabled={busy} direction={sort?.id === item.id ? sort.direction : "none"} onClick={() => { setSort({ id: item.id, direction: sort?.id === item.id && sort.direction === "ascending" ? "descending" : "ascending" }); setPage(0) }}>{item.header}</TableSortButton> : item.header}
        </TableHead>)}
      </TableRow></TableHeader>
      <TableBody>
        {loading ? Array.from({ length: Math.min(size, 5) }, (_, index) => <TableRow key={index}><TableCell colSpan={columns.length + Number(selectable)}><Skeleton className="h-4 w-full" /><span className="sr-only">Loading rows</span></TableCell></TableRow>) : error ? <TableRow><TableCell colSpan={columns.length + Number(selectable)} className="py-8 text-center whitespace-normal"><p role="alert" className="text-destructive">{error}</p>{onRetry && <Button type="button" variant="secondary" size="sm" onClick={onRetry} className="mt-3">Try again</Button>}</TableCell></TableRow> : visibleRows.length === 0 ? <TableRow><TableCell colSpan={columns.length + Number(selectable)} className="py-8 text-center"><p className="text-muted-foreground">{query || filter ? "No matching results." : "No records yet."}</p>{query || filter ? <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => { setQuery(""); setFilter(""); setPage(0) }}>Clear filters</Button> : emptyAction}</TableCell></TableRow> : visibleRows.map(row => {
          const id = getRowId(row)
          return <TableRow key={id} data-state={selected.has(id) ? "selected" : undefined}>
            {selectable && <TableCell><Checkbox aria-label={`Select ${getRowLabel(row)}`} checked={selected.has(id)} onCheckedChange={checked => updateSelection([id], checked === true)} /></TableCell>}
            {columns.map(item => <TableCell key={item.id} numeric={item.numeric}>{item.cell(row)}</TableCell>)}
          </TableRow>
        })}
      </TableBody>
    </Table>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p role="status" className="text-xs tabular-nums text-muted-foreground">{loading ? "Loading…" : error ? "Could not load records" : `${rows.length} result${rows.length === 1 ? "" : "s"}${selectable ? ` · ${selected.size} selected` : ""}`}</p>
      <nav aria-label={`${label} pages`} className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="sm" disabled={busy || currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous</Button>
        <span className="text-xs tabular-nums text-muted-foreground">{currentPage + 1} / {pages}</span>
        <Button type="button" variant="ghost" size="sm" disabled={busy || currentPage >= pages - 1} onClick={() => setPage(currentPage + 1)}>Next</Button>
      </nav>
    </div>
  </section>
}
export { DataTable }
export type { DataTableColumn, DataTableProps }
