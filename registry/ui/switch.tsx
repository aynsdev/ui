"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/** For settings that apply immediately. If a Save button follows, use a Checkbox. */
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative mt-px inline-flex h-4.5 w-8 shrink-0 items-center rounded-full bg-border-strong p-0.5 transition-colors duration-200 ease-out outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
        "pointer-coarse:after:absolute pointer-coarse:after:-inset-3",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-3.5 rounded-full bg-card shadow-[0_1px_2px_rgb(0_0_0/0.2)] dark:bg-foreground transition-transform duration-200 ease-out data-[state=checked]:translate-x-3.5 data-[state=checked]:bg-primary-foreground dark:data-[state=checked]:bg-primary-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
