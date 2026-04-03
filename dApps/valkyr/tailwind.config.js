/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          cyan: '#06b6d4',
          purple: '#9945ff',
          orange: '#ea580c',
          gold: '#f9cc75',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a2e',
          card: '#16213e',
        },
        slate: {
          950: '#0f172a',
          900: '#111827',
          850: '#1a2332',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          400: '#cbd5e1',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        },
        cyan: {
          300: '#06b6d4',
          200: '#22d3ee',
          400: '#06b6d4',
        },
        gold: '#f9cc75',
        amber: {
          300: '#fcd34d',
        },
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'glitch': 'glitch 0.3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.6)',
        'glow-gold': '0 0 30px rgba(249, 204, 117, 0.6)',
      },
    },
  },
  plugins: [],
}
