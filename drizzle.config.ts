/**
 * drizzle-orm configuration and the init file
 *
 * todo: this script possibly still has window
 * todo: for even more new interesting things
 *
 * @see https://orm.drizzle.team/kit-docs/config-reference
 * @see https://discord.com/channels/1043890932593987624/1043890932593987627/1153940001885794304
 */

import path from "node:path";

import * as dotenv from "dotenv";
import { type Config } from "drizzle-kit";

/**
 * Load environments before importing
 * db to get access from the console.
 */
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const connectionString = process.env.DATABASE_URL + "?sslmode=require";

if (!connectionString) {
  throw new Error(
    "[❌] Connection to database is failed.\n\
    [❌] Missing database connection string.\n\
    [❌] Please check DATABASE_URL variable.\n",
  );
}

export default {
  driver: "pg",
  out: "migrations",
  schema: "./src/data/db/schema.ts",
  dbCredentials: { connectionString },
} satisfies Config;
