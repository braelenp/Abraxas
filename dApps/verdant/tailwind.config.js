/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        emerald: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        lime: {
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
        },
      },
      animation: {
        'rr-breathe': 'rr-breathe 3s ease-in-out infinite',
        'rr-spin-slow': 'spin 12s linear infinite',
        'rr-float': 'rr-float 6s ease-in-out infinite',
        'rr-pulse-ring': 'rr-pulse-ring 2.5s ease-out infinite',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.5s ease forwards',
        'bounce-arrow': 'bounce-arrow 1.6s ease-in-out infinite',
      },
      keyframes: {
        'rr-breathe': {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.85' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'rr-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'rr-pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-arrow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
}
