/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pulse: '#9945ff',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-beat': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(153, 69, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(153, 69, 255, 0.8)' },
        },
        'fadeInUp': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-beat': 'pulse-beat 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}
