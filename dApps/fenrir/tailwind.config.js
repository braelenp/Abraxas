/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'void': '#0a0a0a',
        'deep-black': '#050505',
        'purple-core': '#9945ff',
        'orange-fire': '#ff6024',
        'cyan-light': '#00ffff',
        'cyan-bright': '#00ffff',
        'gold-accent': '#fbbf24',
        'gold-bright': '#fcd34d',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'shimmer': 'shimmer 2s linear infinite',
        'typing-reveal': 'typing-reveal 3s steps(50, end)',
        'pulse-rune': 'pulse-rune 2s cubic-bezier(0.4, 0.0, 0.6, 1.0) infinite',
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0.0, 0.6, 1.0) infinite',
        'beam': 'beam 3s ease-in-out infinite',
        'glow-pulse-intense': 'glow-pulse-intense 1.5s cubic-bezier(0.4, 0.0, 0.6, 1.0) infinite',
        'rune-glow': 'rune-glow 1.5s ease-in-out infinite',
        'rune-glow-intense': 'rune-glow-intense 1.2s ease-in-out infinite',
        'blob-pulse': 'blob-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%': { 
            transform: 'translate(0)',
            textShadow: '-2px 0 #ff6024, 2px 0 #06b6d4'
          },
          '20%': { 
            transform: 'translate(-2px, 2px)',
            textShadow: '-2px 0 #ff6024, 2px 0 #06b6d4'
          },
          '40%': { 
            transform: 'translate(-2px, -2px)',
            textShadow: '-2px 0 #ff6024, 2px 0 #06b6d4'
          },
          '60%': { 
            transform: 'translate(2px, 2px)',
            textShadow: '-2px 0 #ff6024, 2px 0 #06b6d4'
          },
          '80%': { 
            transform: 'translate(2px, -2px)',
            textShadow: '-2px 0 #ff6024, 2px 0 #06b6d4'
          },
          '100%': { 
            transform: 'translate(0)',
            textShadow: '-2px 0 #ff6024, 2px 0 #06b6d4'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000% 0' },
          '100%': { backgroundPosition: '1000% 0' },
        },
        'typing-reveal': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'pulse-rune': {
          '0%, 100%': { 
            opacity: '1',
            textShadow: '0 0 10px #ff6024, 0 0 20px #ff6024, 0 0 40px #ff6024'
          },
          '50%': { 
            opacity: '0.7',
            textShadow: '0 0 5px #ff6024, 0 0 10px #ff6024, 0 0 20px #ff6024'
          },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 96, 36, 0.5), 0 0 40px rgba(255, 96, 36, 0.3)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 96, 36, 0.8), 0 0 80px rgba(255, 96, 36, 0.5)'
          },
        },
        'glow-pulse-intense': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(153, 69, 255, 0.8), 0 0 40px rgba(255, 96, 36, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)'
          },
          '50%': {
            boxShadow: '0 0 50px rgba(153, 69, 255, 1), 0 0 80px rgba(255, 96, 36, 0.8), 0 0 100px rgba(6, 182, 212, 0.6)'
          },
        },
        'rune-glow': {
          '0%, 100%': {
            textShadow: '0 0 10px #ff6024, 0 0 20px #ff6024, 0 0 30px #ff6024, 0 0 40px rgba(255, 96, 36, 0.5)'
          },
          '50%': {
            textShadow: '0 0 20px #ff6024, 0 0 40px #ff6024, 0 0 60px #ff6024, 0 0 80px rgba(255, 96, 36, 0.8)'
          },
        },
        'rune-glow-intense': {
          '0%, 100%': {
            textShadow: '0 0 15px #ff6024, 0 0 30px #ff6024, 0 0 50px #9945ff, 0 0 70px rgba(153, 69, 255, 0.6)'
          },
          '50%': {
            textShadow: '0 0 30px #ff6024, 0 0 60px #ff6024, 0 0 80px #9945ff, 0 0 100px rgba(153, 69, 255, 0.8), 0 0 120px rgba(6, 182, 212, 0.5)'
          },
        },
        'beam': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'blob-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1)', opacity: '0.5' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
