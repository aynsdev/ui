"use client"

import * as React from "react"
import { Button, Calendar, CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, DateInput, DatePicker as Primitive, DateRangePicker as RangePrimitive, DateSegment, Dialog, FieldError, Group, Heading, Label, Popover, RangeCalendar, Text, type DatePickerProps as PrimitiveProps, type DateRangePickerProps as RangeProps, type DateValue } from "react-aria-components"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type SharedProps = { label: string; description?: string; errorMessage?: string; className?: string }
type DatePickerProps<T extends DateValue> = Omit<PrimitiveProps<T>, "children" | "className"> & SharedProps
type DateRangePickerProps<T extends DateValue> = Omit<RangeProps<T>, "children" | "className"> & SharedProps
const iconButton = "grid size-10 shrink-0 place-items-center rounded-full outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 pointer-coarse:size-11"
const groupClass = "flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-input bg-card pl-3 text-foreground focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/20 group-data-[invalid]:border-destructive group-data-[disabled]:bg-secondary group-data-[disabled]:text-muted-foreground pointer-coarse:min-h-12"

function Segments({ slot }: { slot?: "start" | "end" }) {
  return <DateInput slot={slot} className="flex items-center text-sm tabular-nums pointer-coarse:text-base">{segment => <DateSegment segment={segment} className="rounded-sm px-0.5 outline-none data-[placeholder]:text-muted-foreground data-[focused]:bg-primary data-[focused]:text-primary-foreground" />}</DateInput>
}
function CalendarContents() {
  return <>
    <header className="mb-3 flex items-center justify-between gap-2">
      <Button slot="previous" className={iconButton}><ChevronLeftIcon aria-hidden="true" className="size-4" /></Button>
      <Heading className="text-sm font-semibold text-balance" />
      <Button slot="next" className={iconButton}><ChevronRightIcon aria-hidden="true" className="size-4" /></Button>
    </header>
    <CalendarGrid className="border-separate border-spacing-0.5">
      <CalendarGridHeader>{day => <CalendarHeaderCell className="pb-2 text-xs font-medium text-muted-foreground">{day}</CalendarHeaderCell>}</CalendarGridHeader>
      <CalendarGridBody>{date => <CalendarCell date={date} className="grid size-9 cursor-default place-items-center rounded-full text-sm tabular-nums outline-none hover:bg-accent data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[disabled]:text-subtle-foreground data-[unavailable]:line-through data-[outside-month]:text-muted-foreground data-[outside-visible-range]:invisible pointer-coarse:h-11" />}</CalendarGridBody>
    </CalendarGrid>
  </>
}
function CalendarPopover({ range = false }: { range?: boolean }) {
  return <Popover offset={8} className="z-50 max-w-[calc(100vw-1rem)] overflow-auto rounded-2xl bg-popover p-3 text-popover-foreground shadow-popover">
    <Dialog className="outline-none">{range ? <RangeCalendar><CalendarContents /></RangeCalendar> : <Calendar><CalendarContents /></Calendar>}</Dialog>
  </Popover>
}
function DatePicker<T extends DateValue>({ label, description, errorMessage, className, ...props }: DatePickerProps<T>) {
  return <Primitive data-slot="date-picker" className={cn("group grid min-w-0 gap-2", className)} {...props}>
    <Label className="text-sm font-medium">{label}</Label>
    <Group className={groupClass}><Segments /><Button className={cn(iconButton, "ml-auto")}><CalendarIcon aria-hidden="true" className="size-4" /></Button></Group>
    {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
    <FieldError className="text-xs text-destructive">{errorMessage}</FieldError>
    <CalendarPopover />
  </Primitive>
}
function DateRangePicker<T extends DateValue>({ label, description, errorMessage, className, ...props }: DateRangePickerProps<T>) {
  return <RangePrimitive data-slot="date-range-picker" className={cn("group grid min-w-0 gap-2", className)} {...props}>
    <Label className="text-sm font-medium">{label}</Label>
    <Group className={groupClass}><Segments slot="start" /><span aria-hidden="true" className="text-muted-foreground">–</span><Segments slot="end" /><Button className={cn(iconButton, "ml-auto")}><CalendarIcon aria-hidden="true" className="size-4" /></Button></Group>
    {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
    <FieldError className="text-xs text-destructive">{errorMessage}</FieldError>
    <CalendarPopover range />
  </RangePrimitive>
}
export { DatePicker, DateRangePicker }
export type { DatePickerProps, DateRangePickerProps }
