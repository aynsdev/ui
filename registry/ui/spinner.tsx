import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("inline-block shrink-0 animate-spin motion-reduce:animate-none! rounded-full border-border-strong border-t-foreground", {
  variants: {
    size: {
      sm: "size-3 border-[1.5px]",
      default: "size-4 border-[1.75px]",
      lg: "size-6 border-2",
    },
  },
  defaultVariants: { size: "default" },
})

/** Short, inline waits. In buttons use <Button loading> instead. */
function Spinner({
  className,
  size,
  label = "Loading",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof spinnerVariants> & { label?: string }) {
  return <span data-slot="spinner" role="status" aria-label={label} className={cn(spinnerVariants({ size }), className)} {...props} />
}

export { Spinner }
