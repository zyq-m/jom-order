import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

const STORAGE_KEY = "jomorder-theme"

function getInitial(): boolean {
  if (typeof window === "undefined") return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return stored === "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function apply(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark)
  localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light")
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitial)

  useEffect(() => { apply(dark) }, [dark])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setDark(e.matches)
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      aria-label={dark ? "Tukar ke mod terang" : "Tukar ke mod gelap"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
