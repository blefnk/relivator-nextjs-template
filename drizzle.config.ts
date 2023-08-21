import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  driver: "mysql2",
  out: "./src/data/db/dm",
  schema: "./src/data/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? ""
  }
} satisfies Config;
