// planetscale (serverless)

import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "~/db/schema/mysql";
import { env } from "~/env";

// Cache the database connection in development. This
// avoids creating a new connection on every HMR update.
//
const globalForDatabase = globalThis as unknown as {
  connectionString: Client | undefined;
};

const connectionString =
  globalForDatabase.connectionString ||
  new Client({
    url: env.DATABASE_URL,

    // TRY USE THIS INSTEAD OF URL IF YOU HAVE ERRORS:

    // host: process.env["DATABASE_HOST"],

    // username: process.env["DATABASE_USERNAME"],

    // password: process.env["DATABASE_PASSWORD"],
  });

if (env.NODE_ENV !== "production") {
  globalForDatabase.connectionString = connectionString;
}

export const db = drizzle(connectionString, {
  schema,
});
