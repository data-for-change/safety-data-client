import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true, // optional: to avoid importing 'expect', 'describe', etc
    setupFiles: './src/setupTests.ts', // optional for setting up things like jest-dom
  },
});