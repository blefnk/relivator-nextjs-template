import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "~/db/schema/pgsql";
import { env } from "~/env";

// db provider: neon (serverless)
//
// =======================================================================
// TODO: fix @neondatabase/serverless can only connect to remote instances
// TODO: @see https://orm.drizzle.team/learn/tutorials/drizzle-with-neon
// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";
// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql);
// =======================================================================
//
// Cache the database connection in development. This
// avoids creating a new connection on every HMR update.
//
const globalForDatabase = globalThis as unknown as {
  connectionString: Pool | undefined;
};

const connectionString =
  globalForDatabase.connectionString ||
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (env.NODE_ENV !== "production") {
  globalForDatabase.connectionString = connectionString;
}

export const db = drizzle(connectionString, {
  schema,
});
