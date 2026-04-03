import { Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  const toggle = () => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  return (
    <button
      onClick={toggle}
      className="border border-steel/50 p-2 text-steel hover:border-gold hover:text-gold transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
