import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // plugin image optimizer
    ViteImageOptimizer({
      jpg: {
        quality: 75, // compress jpg
      },
      jpeg: {
        quality: 75,
      },
      png: {
        quality: 75,
      },
      webp: {
        quality: 75,
      },
      avif: {
        quality: 50,
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["react-router-dom",],
        },
      },
    },
  },
}));
