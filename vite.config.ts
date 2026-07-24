import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/sd-user": { target: "http://localhost:8080", changeOrigin: true },
      "/sd-authorize": { target: "http://localhost:8080", changeOrigin: true },
      "/logout": { target: "http://localhost:8080", changeOrigin: true },
      "/involved": { target: "http://localhost:8080", changeOrigin: true },
      "/city": { target: "http://localhost:8080", changeOrigin: true },
      "/api": { target: "http://localhost:8080", changeOrigin: true },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true, // optional: to avoid importing 'expect', 'describe', etc
    setupFiles: ['./src/setupTests.ts'],
  // Make sure DOM elements get cleaned up between tests
    deps: {
      inline: ['@testing-library/jest-dom']
    },
  },
});