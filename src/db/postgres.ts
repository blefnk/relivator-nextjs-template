// pg-neon-vercel-railway-etc

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "~/db/schema/pgsql";
import { env } from "~/env";

// Cache the database connection in development. This
// avoids creating a new connection on every HMR update.
//
const globalForDatabase = globalThis as unknown as {
  connectionString: postgres.Sql | undefined;
};

const connectionString =
  globalForDatabase.connectionString || postgres(env.DATABASE_URL || "");

// postgres(env.DATABASE_URL, {
//   ssl: "allow",
//   max: 1,
// });
if (env.NODE_ENV !== "production") {
  globalForDatabase.connectionString = connectionString;
}

export const db = drizzle(connectionString, {
  schema,
});
