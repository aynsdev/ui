"use client"

import * as React from "react"
import { Button, ComboBox as Primitive, FieldError, Group, Input, Label, ListBox, ListBoxItem, Popover, Text, type ComboBoxProps } from "react-aria-components"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ComboboxOption = { id: string; label: string; disabled?: boolean }

type ComboboxProps = Omit<ComboBoxProps<ComboboxOption>, "children" | "items" | "defaultItems" | "className"> & {
  options: ComboboxOption[]
  label: string
  placeholder?: string
  description?: string
  errorMessage?: string
  emptyMessage?: string
  className?: string
}

/** Uses one complete React Aria surface for filtering, focus, selection and its popup. */
function Combobox({ options, label, placeholder = "Search options…", description, errorMessage, emptyMessage = "No matches. Try a different search.", className, ...props }: ComboboxProps) {
  return <Primitive allowsEmptyCollection data-slot="combobox" defaultItems={options} disabledKeys={options.filter(option => option.disabled).map(option => option.id)} className={cn("group grid min-w-0 gap-2", className)} {...props}>
    <Label className="text-sm font-medium">{label}</Label>
    <Group className="flex h-10 items-center rounded-lg border border-input bg-card pl-3.5 text-foreground outline-none focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/20 group-data-[invalid]:border-destructive group-data-[disabled]:bg-secondary group-data-[disabled]:text-muted-foreground pointer-coarse:h-12">
      <Input placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle-foreground pointer-coarse:text-base" />
      <Button className="grid size-10 shrink-0 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring pointer-coarse:size-12"><ChevronDownIcon aria-hidden="true" className="size-4" /></Button>
    </Group>
    {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
    <FieldError className="text-xs text-destructive">{errorMessage}</FieldError>
    <Popover className="z-50 w-(--trigger-width) max-w-[calc(100vw-2rem)] overflow-auto rounded-2xl bg-popover p-1.5 text-popover-foreground shadow-popover" offset={8}>
      <ListBox<ComboboxOption> className="max-h-64 overflow-auto outline-none" renderEmptyState={() => <p className="p-3 text-sm text-pretty text-muted-foreground">{emptyMessage}</p>}>
        {option => <ListBoxItem id={option.id} textValue={option.label} className="flex min-h-9 cursor-default items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none data-[focused]:bg-accent data-[disabled]:text-subtle-foreground pointer-coarse:min-h-11">
          {({ isSelected }) => <><span className="min-w-0 break-words">{option.label}</span>{isSelected && <CheckIcon aria-hidden="true" className="size-4 shrink-0" />}</>}
        </ListBoxItem>}
      </ListBox>
    </Popover>
  </Primitive>
}
export { Combobox }
export type { ComboboxOption, ComboboxProps }
