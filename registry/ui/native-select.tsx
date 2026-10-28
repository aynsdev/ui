import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** The native <select>: accessible and mobile-friendly by default. */
function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div data-slot="native-select-wrapper" className="relative w-full has-disabled:opacity-60">
      <select
        data-slot="native-select"
        className={cn(
          "h-10 w-full min-w-0 appearance-none rounded-lg border border-input bg-card py-0 pr-10 pl-3.5 text-sm text-foreground transition-[border-color,box-shadow] duration-150 ease-out outline-none pointer-coarse:h-12 pointer-coarse:text-base",
          "hover:border-border-strong focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20",
          "aria-invalid:border-destructive disabled:cursor-not-allowed disabled:bg-secondary",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

export { NativeSelect, NativeSelectOption }
