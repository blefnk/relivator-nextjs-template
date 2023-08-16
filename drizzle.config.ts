import type { Config } from "drizzle-kit";

import "dotenv/config";

if (!process.env.NEXT_SECRET_URL_PSCALE) {
  throw new Error("NEXT_SECRET_URL_PSCALE is missing");
}

export default {
  schema: "./src/data/db/schema.ts",
  out: "./src/data/db/dm",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.NEXT_SECRET_URL_PSCALE
  }
} satisfies Config;
