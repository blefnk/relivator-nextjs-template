import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { env } from "./src/env.js";

export default defineConfig({
  schema: "./src/server/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
