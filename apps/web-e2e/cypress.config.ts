import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env?.CI
      ? "https://remix-starter-staging.fly.dev"
      : "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
