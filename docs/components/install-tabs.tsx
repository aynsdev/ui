import * as React from "react"

import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NAMESPACE, type FileSource } from "../lib/registry"
import { CodeBlock } from "./code-block"

const managers = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
} as const
type Manager = keyof typeof managers

const install = { pnpm: "pnpm add", npm: "npm install", yarn: "yarn add", bun: "bun add" } as const

function usePackageManager() {
  const [pm, setPm] = React.useState<Manager>(() => {
    try {
      const v = localStorage.getItem("docs-pm")
      if (v && v in managers) return v as Manager
    } catch {}
    return "npm"
  })
  const set = (v: Manager) => {
    setPm(v)
    try {
      localStorage.setItem("docs-pm", v)
    } catch {}
  }
  return [pm, set] as const
}

export function PackageManagerCommand({ items }: { items: string[] }) {
  const [pm, setPm] = usePackageManager()
  return (
    <div className="grid min-w-0 gap-2">
      <SegmentedControl size="sm" aria-label="Package manager" value={pm} onValueChange={(v) => setPm(v as Manager)}>
        {Object.keys(managers).map((m) => (
          <SegmentedControlItem key={m} value={m}>
            {m}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <CodeBlock code={`${managers[pm]} ${items.map((i) => `${NAMESPACE}/${i}`).join(" ")}`} />
    </div>
  )
}

export function InstallTabs({
  name,
  dependencies,
  registryDependencies,
  files,
}: {
  name: string
  dependencies: string[]
  registryDependencies: string[]
  files: FileSource[]
}) {
  const [pm] = usePackageManager()
  return (
    <Tabs defaultValue="cli" className="min-w-0 gap-4">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli" className="mt-0">
        <PackageManagerCommand items={[name]} />
      </TabsContent>
      <TabsContent value="manual" className="mt-0">
        <ol className="grid min-w-0 gap-6 text-sm [counter-reset:step] *:relative *:pl-8 *:before:absolute *:before:top-0 *:before:left-0 *:before:grid *:before:size-5 *:before:place-items-center *:before:rounded-full *:before:bg-secondary *:before:text-[11px] *:before:font-medium *:before:[counter-increment:step] *:before:content-[counter(step)]">
          <li className="grid min-w-0 gap-3">
            <p>
              Set up the <a className="underline underline-offset-3" href="#/theming">theme</a> in your global CSS.
            </p>
          </li>
          {dependencies.length > 0 && (
            <li className="grid min-w-0 gap-3">
              <p>Install the dependencies.</p>
              <CodeBlock code={`${install[pm]} ${dependencies.join(" ")}`} />
            </li>
          )}
          {registryDependencies.length > 0 && (
            <li className="grid min-w-0 gap-3">
              <p>
                Add the components it uses:{" "}
                {registryDependencies.map((r, i) => (
                  <React.Fragment key={r}>
                    {i > 0 && ", "}
                    <a className="underline underline-offset-3" href={`#/components/${r.replace(`${NAMESPACE}/`, "")}`}>
                      {r.replace(`${NAMESPACE}/`, "")}
                    </a>
                  </React.Fragment>
                ))}
                .
              </p>
            </li>
          )}
          <li className="grid min-w-0 gap-3">
            <p>Copy the source into your project.</p>
            {files.map((f) => (
              <CodeBlock key={f.path} title={f.target} code={f.code} collapsible />
            ))}
          </li>
          <li>
            <p>Update the import paths to match your project setup.</p>
          </li>
        </ol>
      </TabsContent>
    </Tabs>
  )
}
