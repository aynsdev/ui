import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { Example } from "../lib/registry"
import { CodeBlock } from "./code-block"

export function ComponentPreview({ example, className }: { example: Example; className?: string }) {
  const { Component } = example
  return (
    <Tabs defaultValue="preview" className={cn("min-w-0 gap-3", className)}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-0">
        <div
          // Example links point at "#"; keep them from changing the docs route
          onClickCapture={(e) => {
            const a = (e.target as HTMLElement).closest("a")
            if (a?.getAttribute("href")?.startsWith("#")) e.preventDefault()
          }}
          className="flex min-h-56 min-w-0 items-center justify-center overflow-x-auto rounded-3xl border border-border bg-background p-6 sm:p-10"
        >
          <React.Suspense fallback={<p role="status" className="text-sm text-muted-foreground">Loading preview…</p>}>
            <Component />
          </React.Suspense>
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <CodeBlock code={example.source} collapsible />
      </TabsContent>
    </Tabs>
  )
}
