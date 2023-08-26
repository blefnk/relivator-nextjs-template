import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  driver: "mysql2",
  out: "./src/data/db/drizzle",
  schema: "./src/data/db/schema.ts",
  dbCredentials: { connectionString }
} satisfies Config;
