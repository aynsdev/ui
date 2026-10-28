"use client"

import * as React from "react"

export type Theme = "system" | "light" | "dark"

const STORAGE_KEY = "theme"
const EVENT = "themechange"

function getStored(): Theme {
  if (typeof window === "undefined") return "system"
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === "light" || v === "dark" ? v : "system"
  } catch {
    return "system"
  }
}

function systemDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
}

function apply(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && systemDark())
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
}

/**
 * Light / dark / system theme using the `.dark` class on <html> (the shadcn convention).
 * Already using next-themes? Keep it; this hook is for projects without it.
 *
 * Add this to <head> to avoid a flash before hydration:
 * <script>try{var t=localStorage.theme;if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script>
 */
export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>(getStored)
  const [resolved, setResolved] = React.useState<"light" | "dark">(() =>
    theme === "dark" || (theme === "system" && systemDark()) ? "dark" : "light"
  )

  React.useEffect(() => {
    apply(theme)
    setResolved(theme === "dark" || (theme === "system" && systemDark()) ? "dark" : "light")

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onSystem = () => {
      if (theme !== "system") return
      apply("system")
      setResolved(mq.matches ? "dark" : "light")
    }
    // Keep every useTheme() in sync: this tab (custom event) and other tabs (storage)
    const onChange = () => setThemeState(getStored())
    mq.addEventListener("change", onSystem)
    window.addEventListener(EVENT, onChange)
    window.addEventListener("storage", onChange)
    return () => {
      mq.removeEventListener("change", onSystem)
      window.removeEventListener(EVENT, onChange)
      window.removeEventListener("storage", onChange)
    }
  }, [theme])

  const setTheme = React.useCallback((next: Theme) => {
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
    setThemeState(next)
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return { theme, setTheme, resolvedTheme: resolved }
}
