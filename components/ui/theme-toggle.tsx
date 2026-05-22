"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const current = resolvedTheme || theme
    console.log("theme button clicked", { theme, resolvedTheme, htmlBefore: document.documentElement.className })
    setTheme(current === "dark" ? "light" : "dark")
    setTimeout(() => {
      console.log("theme toggled", { theme, resolvedTheme, htmlAfter: document.documentElement.className })
    }, 50)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar tema claro/escuro"
      aria-pressed={resolvedTheme === "dark"}
      className="grid place-items-center w-10 h-10 rounded-full border border-border bg-background/80 text-foreground hover:bg-primary/15 transition-colors"
    >
      {!mounted ? (
        <span className="w-5 h-5 rounded bg-muted inline-block" aria-hidden />
      ) : resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
