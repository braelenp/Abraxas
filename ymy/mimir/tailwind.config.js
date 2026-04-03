/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abraxas: {
          purple: '#9945ff',
          'purple-dim': '#6622cc',
          orange: '#ff6a00',
          'orange-bright': '#ff9500',
          cyan: '#00f5ff',
          'cyan-dim': '#00b8cc',
          gold: '#ffd700',
          black: '#050508',
          'dark': '#0a0a12',
          'panel': '#0d0d1a',
          'border': '#1a1a2e',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 4s linear infinite',
        'glow-purple': 'glowPurple 2s ease-in-out infinite alternate',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
        'glow-orange': 'glowOrange 2.5s ease-in-out infinite alternate',
        'scanlines': 'scanlines 8s linear infinite',
        'glitch': 'glitch 6s steps(1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'rune-pulse': 'runePulse 3s ease-in-out infinite',
        'beam-sweep': 'beamSweep 4s ease-in-out infinite',
        'typing': 'typing 3s steps(30) forwards',
        'blink-caret': 'blinkCaret 0.75s step-end infinite',
      },
      keyframes: {
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.8' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.6' },
          '99%': { opacity: '1' },
        },
        glowPurple: {
          '0%': { textShadow: '0 0 10px #9945ff, 0 0 20px #9945ff, 0 0 40px #9945ff' },
          '100%': { textShadow: '0 0 20px #9945ff, 0 0 40px #9945ff, 0 0 80px #9945ff, 0 0 120px #6622cc' },
        },
        glowCyan: {
          '0%': { textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff' },
          '100%': { textShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 80px #00b8cc' },
        },
        glowOrange: {
          '0%': { textShadow: '0 0 10px #ff6a00, 0 0 20px #ff9500' },
          '100%': { textShadow: '0 0 20px #ff6a00, 0 0 40px #ff9500, 0 0 80px #ff6a00' },
        },
        scanlines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100vh' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)', filter: 'none' },
          '91%': { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '92%': { transform: 'translate(2px, -1px)', filter: 'hue-rotate(-90deg)' },
          '93%': { transform: 'translate(0)', filter: 'none' },
          '94%': { transform: 'translate(-3px, 0)', filter: 'brightness(1.5)' },
          '95%': { transform: 'translate(0)', filter: 'none' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        runePulse: {
          '0%, 100%': {
            textShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 10px #ffd700',
            transform: 'scale(1)',
          },
          '50%': {
            textShadow: '0 0 40px #00f5ff, 0 0 80px #00f5ff, 0 0 120px #00b8cc, 0 0 30px #ffd700',
            transform: 'scale(1.05)',
          },
        },
        beamSweep: {
          '0%': { opacity: '0.2', transform: 'scaleY(0.8)' },
          '50%': { opacity: '0.6', transform: 'scaleY(1)' },
          '100%': { opacity: '0.2', transform: 'scaleY(0.8)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blinkCaret: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00f5ff' },
        },
      },
      fontFamily: {
        'mono': ['"Courier New"', 'Courier', 'monospace'],
        'display': ['"Cinzel"', 'serif'],
      },
    },
  },
  plugins: [],
}
