import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // 👈 "node" for backend, "jsdom" for React frontend
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
