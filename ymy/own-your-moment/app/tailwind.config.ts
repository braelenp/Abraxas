import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#080808",
        gold: "#f2c230",
        crimson: "#eb1c24",
        neon: "#33f2c4",
        ember: "#ff8a3d",
      },
      boxShadow: {
        glow: "0 0 48px rgba(242, 194, 48, 0.24)",
      },
      backgroundImage: {
        court: "linear-gradient(rgba(242,194,48,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,194,48,0.1) 1px, transparent 1px)",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
