import * as React from "react"

import { cn } from "@/lib/utils"

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: React.ReactNode }) {
  return (
    <header className="grid gap-3 pb-8">
      {eyebrow && <p className="text-[13px] font-medium text-muted-foreground">{eyebrow}</p>}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <h1 className="text-[28px] leading-tight font-semibold tracking-[-0.025em] sm:text-[32px]">{title}</h1>
        {actions}
      </div>
      <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
    </header>
  )
}

export function Section({ id, title, children, className }: { id: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("grid min-w-0 gap-4 pt-10", className)}>
      <h2 className="text-lg font-semibold tracking-[-0.015em]">
        <a href={`#${id}`} onClick={(e) => (e.preventDefault(), document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }))}>
          {title}
        </a>
      </h2>
      {children}
    </section>
  )
}

export function P({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("max-w-2xl text-sm leading-relaxed text-muted-foreground [&_code]:rounded-[5px] [&_code]:bg-secondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:text-foreground", className)} {...props} />
}
