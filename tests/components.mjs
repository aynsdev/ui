import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { createServer } from "vite"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" })
try {
  const { contributionDays, ContributionGrid } = await server.ssrLoadModule(resolve("registry/ui/contribution-grid.tsx"))
  assert.equal(contributionDays(2024, []).length, 366)
  assert.equal(contributionDays(2100, []).length, 365)
  assert.equal(contributionDays(2000, []).length, 366)
  assert.throws(() => contributionDays(2024.5, []), RangeError)
  const days = contributionDays(2024, [
    { date: "2024-02-29", count: 2 }, { date: "2024-02-29", count: 7 },
    { date: "2024-02-29", count: -1 }, { date: "2024-03-01", count: Infinity },
    { date: "2024-02-30", count: 999 }, { date: "2023-12-31", count: 999 },
  ])
  assert.equal(days.reduce((sum, day) => sum + day.count, 0), 7)
  assert.equal(days[59].date, "2024-02-29")
  const render = props => renderToStaticMarkup(React.createElement(ContributionGrid, { year: 2024, data: [], ...props }))
  const calendar = render({ endDate: "2024-01-04", thresholds: [3, 6, 9], data: [1, 4, 7, 10, 100].map((count, i) => ({ date: `2024-01-0${i + 1}`, count })) })
  for (let i = 1; i <= 4; i++) assert.match(calendar, new RegExp(`data-date="2024-01-0${i}" data-level="${i}"`))
  assert.match(calendar, /data-date="2024-01-05" data-level="future"/)
  assert.match(calendar, /22 contributions across 4 active days/)
  assert.equal((calendar.match(/<th scope="row"/g) ?? []).length, 4)
  assert.match(calendar, /stroke-dasharray/)
  assert.match(render({ locale: "fr-FR" }), /janv\./)
  assert.throws(() => render({ endDate: "2024-02-30" }), RangeError)
  assert.throws(() => render({ thresholds: [3, 3, 9] }), RangeError)
  assert.throws(() => render({ thresholds: [0, 3, 9] }), RangeError)
  const { useField } = await server.ssrLoadModule(resolve("registry/hooks/use-field.ts"))
  let field
  function Probe({ description, error }) { field = useField({ id: "project", description, error }); return null }
  renderToStaticMarkup(React.createElement(Probe, { description: "Help", error: "Required" }))
  assert.equal(field.controlProps["aria-describedby"], "project-description project-error")
  assert.equal(field.controlProps["aria-invalid"], true)
  assert.equal(field.labelProps.htmlFor, field.controlProps.id)
  renderToStaticMarkup(React.createElement(Probe))
  assert.equal(field.controlProps["aria-describedby"], undefined)
  assert.equal(field.controlProps["aria-invalid"], undefined)
  const registry = JSON.parse(readFileSync("registry.json", "utf8"))
  const names = new Set(registry.items.map(item => item.name))
  for (const name of ["popover", "alert-dialog", "combobox", "sheet", "input-group", "date-picker", "data-table", "activity-feed", "use-field"]) assert.ok(names.has(name), `Missing ${name}`)
  for (const item of registry.items) {
    for (const dependency of item.registryDependencies ?? []) {
      if (dependency.startsWith("@aynsdev/")) assert.ok(names.has(dependency.slice(9)), `${item.name}: missing ${dependency}`)
    }
  }
  console.log("Passed calendar boundaries, data validation, thresholds, cutoff dates, localization, field associations and registry dependency checks.")
} finally {
  await server.close()
}
