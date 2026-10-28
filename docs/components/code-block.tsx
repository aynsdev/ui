import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { highlight } from "../lib/highlight"
import { copy } from "../lib/clipboard"

export function CopyButton({ text, className, label = "Copy code" }: { text: string; className?: string; label?: string }) {
  const [done, setDone] = React.useState(false)
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      className={cn("bg-card/80 backdrop-blur", className)}
      onClick={async () => {
        await copy(text, "Copied")
        setDone(true)
        setTimeout(() => setDone(false), 1500)
      }}
    >
      {done ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}

export function CodeBlock({
  code,
  title,
  collapsible = false,
  className,
}: {
  code: string
  title?: string
  collapsible?: boolean
  className?: string
}) {
  const [expanded, setExpanded] = React.useState(!collapsible)
  const nodes = React.useMemo(() => highlight(code), [code])
  const long = collapsible && code.split("\n").length > 16

  return (
    <div className={cn("relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card", className)}>
      {title && (
        <div className="flex h-10 items-center border-b border-border px-4 font-mono text-xs font-normal text-muted-foreground">{title}</div>
      )}
      <CopyButton text={code} className={cn("absolute right-2", title ? "top-1" : "top-2")} />
      <pre
        className={cn(
          "overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.7] font-normal text-foreground [tab-size:2]",
          long && !expanded && "max-h-72 overflow-y-hidden"
        )}
      >
        <code>{nodes}</code>
      </pre>
      {long && (
        <div className={cn("flex justify-center pb-3", !expanded && "absolute inset-x-0 bottom-0 bg-linear-to-t from-card from-40% to-transparent pt-12")}>
          <Button variant="outline" size="xs" onClick={() => setExpanded((e) => !e)}>
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      )}
    </div>
  )
}
