import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [visualizer({ open: true })], // Opens a report after build
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "axios"], // Split vendors
        },
      },
    },
  },
});
