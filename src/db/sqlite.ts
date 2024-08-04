// sqlite

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "~/db/schema/sqlite";
import { env } from "~/env";

// Cache the database connection in development. This
// avoids creating a new connection on every HMR update.
//
const globalForDatabase = globalThis as unknown as {
  connectionString: Database.Database | undefined;
};

export const connectionString =
  globalForDatabase.connectionString ||
  new Database(env.DATABASE_URL, {
    fileMustExist: false,
  });

if (env.NODE_ENV !== "production") {
  globalForDatabase.connectionString = connectionString;
}

export const db = drizzle(connectionString, {
  schema,
});
