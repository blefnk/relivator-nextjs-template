import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

import {
  databaseDialect,
  databasePrefix,
  databaseProvider,
} from "./reliverse.config";

/* eslint-disable no-restricted-properties */
config({ path: ".env" });

// Determine the output path based on the database provider
const outNeonOrPg = `drizzle/${databasePrefix}/pgsql`;
const outSqlite = `drizzle/${databasePrefix}/sqlite`;
const outMysql = `drizzle/${databasePrefix}/mysql`;

const outElse =
  databaseProvider === "neon" || databaseProvider === "private-pg"
    ? outNeonOrPg
    : databaseProvider === "private-sqlite"
      ? outSqlite
      : outMysql;

const outRailwayMysql = `drizzle/${databasePrefix}/mysql`;
const outRailwayPg = `drizzle/${databasePrefix}/pgsql`;

const outRailway =
  databaseProvider === "railway-mysql" ? outRailwayMysql : outRailwayPg;

const out = databaseProvider.startsWith("railway") ? outRailway : outElse;

// Determine the schema path based on the database provider
const schemaPg = "src/db/schema/pgsql.ts";
const schemaSqlite = "src/db/schema/sqlite.ts";
const schemaMysql = "src/db/schema/mysql.ts";

const schemaElse =
  databaseProvider === "neon" || databaseProvider === "private-pg"
    ? schemaPg
    : databaseProvider === "private-sqlite"
      ? schemaSqlite
      : schemaMysql;

const schemaRailway =
  databaseProvider === "railway-mysql" ? schemaMysql : schemaPg;

const schema = databaseProvider.startsWith("railway")
  ? schemaRailway
  : schemaElse;

// Export the configuration
// consola.info("Database configuration loading...");
// @see https://orm.drizzle.team/learn/tutorials/drizzle-with-neon
export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL! || "",
  },
  dialect: databaseDialect,
  migrations: {
    schema: "public",
    table: out,
  },
  out,
  schema,
  strict: true,
  tablesFilter: [`${databasePrefix}_*`],
  verbose: false,
});
