import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
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