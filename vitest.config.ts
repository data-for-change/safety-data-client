import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enable global test functions like expect, describe, it
    environment: 'jsdom', // Use jsdom for DOM manipulation in tests
  },
});