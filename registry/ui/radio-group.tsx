"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer relative mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-border-strong bg-card transition-[background-color,border-color] duration-150 ease-out outline-none",
        "hover:border-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        "pointer-coarse:after:absolute pointer-coarse:after:-inset-3",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="size-1.5 rounded-full bg-primary-foreground" />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
