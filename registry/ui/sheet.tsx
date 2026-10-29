"use client"

import * as React from "react"
import { Dialog as Primitive } from "radix-ui"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Sheet(props: React.ComponentProps<typeof Primitive.Root>) { return <Primitive.Root {...props} /> }
function SheetTrigger(props: React.ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Trigger data-slot="sheet-trigger" {...props} /> }
function SheetClose(props: React.ComponentProps<typeof Primitive.Close>) { return <Primitive.Close data-slot="sheet-close" {...props} /> }
function SheetContent({ className, children, side = "right", ...props }: React.ComponentProps<typeof Primitive.Content> & { side?: "left" | "right" | "bottom" }) {
  return <Primitive.Portal>
    <Primitive.Overlay className="fixed inset-0 z-50 bg-overlay" />
    <Primitive.Content data-slot="sheet-content" data-side={side} className={cn("fixed z-50 flex flex-col gap-6 overflow-y-auto bg-popover p-6 text-popover-foreground shadow-dialog outline-none pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))]", side === "bottom" ? "inset-x-0 bottom-0 max-h-[90dvh] rounded-t-3xl" : "inset-y-0 w-full max-w-md", side === "right" && "right-0 sm:rounded-l-3xl", side === "left" && "left-0 sm:rounded-r-3xl", className)} {...props}>
      {children}
      <Primitive.Close asChild><Button type="button" variant="ghost" size="icon" aria-label="Close panel" className="absolute top-4 right-4"><XIcon /></Button></Primitive.Close>
    </Primitive.Content>
  </Primitive.Portal>
}
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) { return <div className={cn("grid gap-2 pr-12", className)} {...props} /> }
function SheetTitle({ className, ...props }: React.ComponentProps<typeof Primitive.Title>) { return <Primitive.Title className={cn("text-lg font-semibold text-balance", className)} {...props} /> }
function SheetDescription({ className, ...props }: React.ComponentProps<typeof Primitive.Description>) { return <Primitive.Description className={cn("text-sm text-pretty text-muted-foreground", className)} {...props} /> }
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) { return <div className={cn("mt-auto flex flex-wrap justify-end gap-2 pt-4", className)} {...props} /> }
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter }
