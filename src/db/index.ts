import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This
 * avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: true,
  },
  schema,
});

//////
// import { drizzle } from "drizzle-orm/node-postgres";
// import { env } from "~/env";

// export const db = drizzle({
//   connection: {
//     connectionString: env.DATABASE_URL,
//     ssl: true,
//   },
// });

//////

// import { env } from "~/env.js";
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// import * as schema from "./schema";

// const client = postgres(env.DATABASE_URL || "");
// export const db = drizzle(client, { schema });
