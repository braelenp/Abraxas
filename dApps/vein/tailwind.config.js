/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vein: {
          night: '#050816',
          abyss: '#08111f',
          purple: '#9945ff',
          orange: '#ff8a24',
          cyan: '#3cf6ff',
          gold: '#d9a441',
          emerald: '#4fbf87',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'vein-glow': '0 0 30px rgba(153, 69, 255, 0.28), 0 0 80px rgba(60, 246, 255, 0.12)',
        'vein-panel': '0 0 0 1px rgba(153, 69, 255, 0.22), 0 28px 80px rgba(1, 7, 18, 0.88), 0 0 40px rgba(255, 138, 36, 0.12)',
      },
      animation: {
        'orbital-drift': 'orbital-drift 18s ease-in-out infinite alternate',
        'beam-sweep': 'beam-sweep 8s ease-in-out infinite',
        'float-rise': 'float-rise 16s linear infinite',
        'sigil-pulse': 'sigil-pulse 3.8s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
      },
      keyframes: {
        'orbital-drift': {
          '0%': { transform: 'scale(1.04) translate3d(-1%, -1%, 0)' },
          '100%': { transform: 'scale(1.16) translate3d(1.5%, 1%, 0)' },
        },
        'beam-sweep': {
          '0%, 100%': { opacity: '0.12', transform: 'translateX(-4%) translateY(-1%)' },
          '50%': { opacity: '0.34', transform: 'translateX(4%) translateY(1%)' },
        },
        'float-rise': {
          '0%': { transform: 'translate3d(0, 16px, 0) scale(0.92)', opacity: '0' },
          '15%': { opacity: '0.7' },
          '85%': { opacity: '0.5' },
          '100%': { transform: 'translate3d(0, -68px, 0) scale(1.08)', opacity: '0' },
        },
        'sigil-pulse': {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 12px rgba(79, 191, 135, 0.36))' },
          '50%': { transform: 'scale(1.03)', filter: 'drop-shadow(0 0 22px rgba(217, 164, 65, 0.45))' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.75' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
