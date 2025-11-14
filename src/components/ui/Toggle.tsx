import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      ) : (
        <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
}
