"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Stacked, filled disclosure rows. Each item is its own rounded surface, so the list reads as
 * a set of questions rather than a divided table.
 */
function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("grid gap-2", className)} {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("overflow-hidden rounded-3xl bg-card text-card-foreground", className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion flex min-h-16 flex-1 items-center justify-between gap-4 rounded-3xl px-6 py-4 text-left text-base font-medium tracking-[-0.015em] outline-none",
          "transition-colors duration-150 hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground transition-[rotate,background-color,color] duration-200 ease-out group-data-[state=open]/accordion:rotate-45 group-data-[state=open]/accordion:bg-primary group-data-[state=open]/accordion:text-primary-foreground"
        >
          <PlusIcon className="size-3.5" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-[15px] leading-relaxed text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-6 pb-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
