"use client"

import * as React from "react"
import { Popover as Primitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Popover(props: React.ComponentProps<typeof Primitive.Root>) { return <Primitive.Root {...props} /> }
function PopoverTrigger(props: React.ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Trigger data-slot="popover-trigger" {...props} /> }
function PopoverAnchor(props: React.ComponentProps<typeof Primitive.Anchor>) { return <Primitive.Anchor {...props} /> }
function PopoverClose(props: React.ComponentProps<typeof Primitive.Close>) { return <Primitive.Close data-slot="popover-close" {...props} /> }
function PopoverContent({ className, align = "start", sideOffset = 8, ...props }: React.ComponentProps<typeof Primitive.Content>) {
  return <Primitive.Portal><Primitive.Content data-slot="popover-content" align={align} sideOffset={sideOffset} className={cn("z-50 w-80 max-w-[calc(100vw-2rem)] max-h-(--radix-popover-content-available-height) overflow-auto rounded-2xl bg-popover p-4 text-sm text-popover-foreground shadow-popover outline-none", className)} {...props} /></Primitive.Portal>
}
export { Popover, PopoverTrigger, PopoverAnchor, PopoverClose, PopoverContent }
