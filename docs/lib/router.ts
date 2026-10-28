import * as React from "react"

export type Route = { page: "introduction" | "installation" | "theming" | "patterns" } | { page: "component"; id: string }

function parse(hash: string): Route {
  const path = hash.replace(/^#\/?/, "")
  if (path.startsWith("components/")) return { page: "component", id: path.slice("components/".length) }
  if (path === "patterns" || path === "installation" || path === "theming") return { page: path }
  return { page: "introduction" }
}

export const href = (route: Route) => (route.page === "component" ? `#/components/${route.id}` : route.page === "introduction" ? "#/" : `#/${route.page}`)

export function useRoute() {
  const [route, setRoute] = React.useState(() => parse(window.location.hash))
  React.useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  return route
}
