/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raido: {
          gold: '#d4af37',
          'gold-light': '#e6c547',
          'deep-blue': '#0a1f3e',
          'deep-blue-accent': '#1a3a5c',
          'deep-blue-lighter': '#2a4a7c',
          cyan: '#00ffff',
          'cyan-subtle': '#00e6e6',
          purple: '#9945ff',
          black: '#0d0d1a',
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      keyframes: {
        'typing-reveal': {
          '0%': {
            width: '0%',
            opacity: '0',
          },
          '100%': {
            width: '100%',
            opacity: '1',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.8), 0 0 80px rgba(212, 175, 55, 0.4)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'beam': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        'typing-reveal': 'typing-reveal 3s steps(50, end) forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'beam': 'beam 2s ease-in-out infinite',
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.6)',
        'glow-blue': '0 0 20px rgba(26, 58, 92, 0.6)',
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.4)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
