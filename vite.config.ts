import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const basePath = process.env.BASE_PATH ?? "";

export default defineConfig({
  base: basePath,

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
  },

  preview: {
    port: 3000,
    host: "0.0.0.0",
  },
});
