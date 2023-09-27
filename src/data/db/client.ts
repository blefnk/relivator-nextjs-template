/**
 * The file used for connecting to db from app,
 * and to run automatic migrations when needed.
 *
 * @see https://orm.drizzle.team/docs/sql-schema-declaration
 * @see https://neon.tech/docs/serverless/serverless-driver
 *
 * todo: [app.ts] if make sense implement the choice:
 * todo: serverless-serverfull; neon-vercel-pg-mysql
 *
 * todo: currently http method is used for neon
 * todo: but we can also try to use websockets
 *
 * todo: this script possibly still has window
 * todo: for even more new interesting things
 *
 * todo: maybe we can implement here
 * todo: `next-safe-action` library
 *
 * @see https://youtu.be/qCLV0Iaq9zU
 * @see https://youtu.be/phUhGC24ETo
 */

import path from "node:path";

import { Client, neon, neonConfig } from "@neondatabase/serverless";
import { inferRouterOutputs } from "@trpc/server";
import dotenv from "dotenv";
import { DrizzleConfig } from "drizzle-orm";
import {
  drizzle as drizzleNeon,
  type NeonHttpDatabase,
} from "drizzle-orm/neon-http";
import {
  drizzle as drizzlePg,
  type PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "~/data/db/schema";
import { env } from "~/data/env/env.mjs";
import { router } from "~/data/env/trpc";
import { todosRouter } from "~/data/routers/todos";
import { userRouter } from "~/data/routers/users";

// Configure Neon client
neonConfig.fetchConnectionCache = true;

// Load env before importing db to get access from console
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

export const schemaPg = postgres(connectionString, { ssl: "allow", max: 1 });

export const schemaNeon = neon(connectionString);

export const neonClient = new Client({
  connectionString,
  ssl: true,
});

const dbConfig: DrizzleConfig = {
  logger: env.NODE_ENV === "development",
};

// todo: works, but currently `db` below is just used
export const dbNeon = drizzleNeon(schemaNeon, {
  schema,
  logger: false,
  // logger: env.NODE_ENV === "development",
});

// use this if you get things like `No transactions support in neon-http driver`
// todo: we need to use `dbNeon` in files where transactions are used, and `db` where not
// todo: as suggestion we can rename `dbNeon` to `db` and `db` to `pg`
export const db = drizzlePg(schemaPg, {
  schema,
  logger: false,
  // logger: env.NODE_ENV === "development",
});

// todo: implement toggling the automatic
// todo: migrations in app.ts config file
// import { migrate } from "drizzle-orm/postgres-js/migrator";
// process.env.NODE_ENV === "development" &&
//   migrate(db, { migrationsFolder: "migrations" });

export const appRouter = router({
  user: userRouter,
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
