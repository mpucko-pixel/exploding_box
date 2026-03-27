// vite.config.js  — Vite 8 clean config
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    open: true,
  },

  build: {
    sourcemap: false,
  },

  assetsInclude: ["**/*.glb", "**/*.gltf"],

  // Updated optimizer for Vite 8 (no rollupOptions!)
  optimizeDeps: {
    rolldownOptions: {},
  },

  // IMPORTANT: Remove all esbuild.jsx settings
});