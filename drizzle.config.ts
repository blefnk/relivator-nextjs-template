import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.NEXT_SECRET_URL_ORM_DRIZZLE) {
  throw new Error("NEXT_SECRET_URL_ORM_DRIZZLE is missing");
}

export default {
  schema: "./src/data/db/schema.ts",
  out: "./src/data/db/dm",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.NEXT_SECRET_URL_ORM_DRIZZLE ?? ""
  }
} satisfies Config;
