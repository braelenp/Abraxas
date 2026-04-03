import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: '#1a1a1a',
        gunmetal: '#2a3a3a',
        military: '#364537',
        gold: '#d4a574',
        steel: '#3a4f5f',
        offwhite: '#f5f5f5',
        'abraxas-cyan': '#22d3ee',
        'abraxas-gold': '#f9cc75',
        'abraxas-orange': '#ea580c',
        'abraxas-violet': '#a855f7',
        'abraxas-amber': '#fbbf24',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'slate-950': '#0f172a',
        'slate-900': '#111827',
        'slate-850': '#1a2332',
      },
    },
  },
  plugins: [],
} satisfies Config
