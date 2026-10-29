import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-group" className={cn("flex min-w-0 items-center gap-2 rounded-lg border border-input bg-card px-3 text-foreground hover:border-border-strong has-[:focus-visible]:border-ring has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ring/20 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-destructive/20 has-[:disabled]:bg-secondary", className)} {...props} />
}
function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="input-group-input" className={cn("border-0 bg-transparent px-0 focus-visible:ring-0 disabled:bg-transparent", className)} {...props} />
}
/** Decorative icons should use aria-hidden; meaningful units should be linked with aria-describedby. */
function InputGroupAddon({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="input-group-addon" className={cn("flex shrink-0 items-center gap-2 text-sm text-muted-foreground [&_svg]:size-4", className)} {...props} />
}
function InputGroupButton({ className, type = "button", variant = "ghost", size = "icon-sm", ...props }: React.ComponentProps<typeof Button>) {
  return <Button type={type} variant={variant} size={size} className={cn("shrink-0", className)} {...props} />
}
export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton }
