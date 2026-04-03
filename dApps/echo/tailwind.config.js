/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#040409',
        purple: '#9945ff',
        cyan: '#22e7f2',
        amber: '#ff9f1c',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(153, 69, 255, 0.45)',
      },
    },
  },
  plugins: [],
}
