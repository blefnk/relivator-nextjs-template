import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { DB_DEV_LOGGER } from "~/app";

import * as schema from "./schema";

// Ensure the database URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("🔴 DATABASE_URL environment variable is not set");
}

/**
 * Caches the database connection in development to
 * prevent creating a new connection on every HMR update.
 */
type DbConnection = ReturnType<typeof postgres>;
const globalForDb = globalThis as unknown as {
  conn?: DbConnection;
};
export const conn: DbConnection =
  globalForDb.conn ?? postgres(process.env.DATABASE_URL);
if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
}

// Database connection instance
export const db = drizzle(conn, {
  logger: DB_DEV_LOGGER && process.env.NODE_ENV !== "production",
  schema,
});
