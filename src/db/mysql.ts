// mysql-railway-etc
import type { Pool } from "mysql2/promise";

import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";

import * as schema from "~/db/schema/mysql";
import { env } from "~/env";

// Cache the database connection in development. This
// avoids creating a new connection on every HMR update.
//
const globalForDatabase = globalThis as unknown as {
  connectionString: Pool | undefined;
};

const connectionString =
  globalForDatabase.connectionString ||
  createPool({
    uri: env.DATABASE_URL,

    // TRY USE THIS INSTEAD OF URI IF YOU HAVE ERRORS:

    // host: process.env["DATABASE_HOST"],

    // user: process.env["DATABASE_USERNAME"],

    // password: process.env["DATABASE_PASSWORD"],

    // database: process.env["DATABASE_NAME"],
  });

if (env.NODE_ENV !== "production") {
  globalForDatabase.connectionString = connectionString;
}

export const db = drizzle(connectionString, {
  mode: "default",
  schema,
});
