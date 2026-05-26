"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { ReactNode } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: "light" | "dark"
  systemTheme: "light" | "dark"
  themes: Theme[]
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = "theme"
const SYSTEM_MEDIA_QUERY = "(prefers-color-scheme: dark)"
const DEFAULT_THEME: Theme = "system"
const AVAILABLE_THEMES: Theme[] = ["light", "dark", "system"]

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return DEFAULT_THEME
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored
    }
  } catch {
    // ignore localStorage access failures
  }

  return DEFAULT_THEME
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia(SYSTEM_MEDIA_QUERY).matches ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)
const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")
const [mounted, setMounted] = useState(false)

const resolvedTheme = theme === "system" ? systemTheme : theme

useEffect(() => {
  setMounted(true)
  setThemeState(getStoredTheme())
  setSystemTheme(getSystemTheme())
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const html = document.documentElement

    if (resolvedTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore localStorage write failures
    }
  }, [mounted, resolvedTheme, theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_MEDIA_QUERY)

    const onChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light")
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange)
      return () => mediaQuery.removeEventListener("change", onChange)
    }

    mediaQuery.addListener(onChange)
    return () => mediaQuery.removeListener(onChange)
  }, [])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      systemTheme,
      themes: AVAILABLE_THEMES,
      setTheme,
    }),
    [theme, resolvedTheme, systemTheme, setTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
