import * as React from "react"
import lightLogo from "./assets/logo-light-mode.svg"
import logo from "./assets/logo-dark-mode.svg"
import { MenuIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Nav, NavGroup, NavItem, NavLabel } from "@/components/ui/nav"
import { Toaster } from "@/components/ui/sonner"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { cn } from "@/lib/utils"
import { components, groups, REPO_URL } from "./lib/registry"
import { href, useRoute, type Route } from "./lib/router"
import { ComponentPage } from "./pages/component-page"
import { Installation } from "./pages/installation"
import { Introduction } from "./pages/introduction"
import { Patterns } from "./pages/patterns"
import { Theming } from "./pages/theming"

const isActive = (route: Route, target: Route) =>
  route.page === target.page && (route.page !== "component" || (target.page === "component" && route.id === target.id))

function Sidebar({ route }: { route: Route }) {
  const guide: [string, Route][] = [
    ["Introduction", { page: "introduction" }],
    ["Installation", { page: "installation" }],
    ["Theming", { page: "theming" }],
    ["Patterns", { page: "patterns" }],
  ]
  return (
    <Nav aria-label="Documentation">
      <NavGroup>
        <NavLabel>Getting started</NavLabel>
        {guide.map(([label, target]) => (
          <NavItem key={label} href={href(target)} isActive={isActive(route, target)}>
            <span>{label}</span>
          </NavItem>
        ))}
      </NavGroup>
      {groups.map((g) => (
        <NavGroup key={g}>
          <NavLabel>{g}</NavLabel>
          {components
            .filter((c) => c.group === g)
            .map((c) => {
              const target: Route = { page: "component", id: c.id }
              return (
                <NavItem key={c.id} href={href(target)} isActive={isActive(route, target)}>
                  <span>{c.title}</span>
                </NavItem>
              )
            })}
        </NavGroup>
      ))}
    </Nav>
  )
}

export function App() {
  const route = useRoute()
  const [menuOpen, setMenuOpen] = React.useState(false)
  React.useEffect(() => setMenuOpen(false), [route])

  const entry = route.page === "component" ? components.find((c) => c.id === route.id) : undefined
  React.useEffect(() => {
    document.title = entry ? `${entry.title} · aynsdev/ui` : "aynsdev/ui"
  }, [entry])

  return (
    <div className="min-h-dvh">
      <Toaster position="bottom-right" />
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
          <a href="#/" className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
            <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center">
              <img src={lightLogo} alt="" width={32} height={32} className="size-8 dark:hidden" />
              <img src={logo} alt="" width={32} height={32} className="hidden size-8 dark:block" />
            </span>
            aynsdev/ui
          </a>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="max-sm:hidden">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl px-4 sm:px-6">
        <aside
          className={cn(
            "shrink-0 overflow-y-auto overscroll-contain py-6 lg:sticky lg:top-14 lg:block lg:h-[calc(100dvh-3.5rem)] lg:w-56 lg:pr-6",
            menuOpen ? "fixed inset-x-0 top-14 bottom-0 z-30 block bg-background px-4 sm:px-6" : "hidden"
          )}
        >
          <Sidebar route={route} />
        </aside>

        <main className="min-w-0 flex-1 py-8 sm:py-10 lg:pl-10">
          <div className="mx-auto max-w-3xl">
            {route.page === "introduction" && <Introduction />}
            {route.page === "installation" && <Installation />}
            {route.page === "theming" && <Theming />}
            {route.page === "patterns" && <Patterns />}
            {route.page === "component" &&
              (entry ? (
                <ComponentPage key={entry.id} entry={entry} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No component called “{route.id}”. <a className="underline" href="#/">Back to the introduction</a>.
                </p>
              ))}
          </div>
        </main>
      </div>
    </div>
  )
}
