import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ["buffer", "process", "stream", "util"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  define: {
    "process.env": {},
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
