import { databasePrefix } from "~/../reliverse.config";
import { mysqlTableCreator } from "drizzle-orm/mysql-core";
import { pgTableCreator } from "drizzle-orm/pg-core";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

// Unified Schema Exporter for Multiple Databases
// ==============================================
// Configure this file based on the database provider
// Feel free to add, remove, or edit things as needed
// You may also need to edit drizzle.config.ts
// Please also check: index.ts and ../index.ts
//
export const mysqlTable = mysqlTableCreator(
  (name) => `${databasePrefix}_${name}`,
);

export const pgTable = pgTableCreator((name) => `${databasePrefix}_${name}`);

export const sqliteTable = sqliteTableCreator(
  (name) => `${databasePrefix}_${name}`,
);
