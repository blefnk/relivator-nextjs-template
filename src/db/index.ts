import "dotenv/config";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import {
  type PostgresJsDatabase,
  type PostgresJsTransaction,
  drizzle,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Caches the database connection in development to
 * prevent creating a new connection on every HMR update.
 */
type DbConnection = ReturnType<typeof postgres>;
const globalForDb = globalThis as unknown as {
  conn?: DbConnection;
};
export const conn: DbConnection =
  globalForDb.conn ?? postgres(process.env.DATABASE_URL ?? "");
if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
}

// Exports the database connection instance
export const db = drizzle(conn, { schema, logger: false });

// Exports helper types for the database
export type Database = PostgresJsDatabase<typeof schema>;
export type Transaction = PostgresJsTransaction<
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
