import { defineConfig } from "drizzle-kit";
import { env } from "./app/.server/composables/env";

export default defineConfig({
  out: "./migrations",
  dialect: "postgresql",

  schema: "./app/.server/composables/db/schema/index.ts",

  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
