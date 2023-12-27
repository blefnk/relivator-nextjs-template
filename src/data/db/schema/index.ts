/**
 * Unified Schema Exporter for Multiple Databases
 * ==============================================
 *
 * Supports both MySQL and PostgreSQL, enabling consistent table imports across the app.
 * Uses environment variables for schema selection, compatible with PlanetScale, Neon, Vercel,
 * and Railway providers. Aims to maintain schema consistency and minimize table mismatches.
 *
 * Includes instructions, resources, inspirations at the end of file.
 * Check {dialect}.ts files to see the detailed database structures.
 */

import * as schemaMysql from "~/data/db/schema/mysql";
import * as schemaPgsql from "~/data/db/schema/pgsql";
import { env } from "~/env.mjs";

// Configure this based on the database provider.
// Feel free to add/remove/edit things if needed.
const selectedSchema = (() => {
  let dbProvider = env.NEXT_PUBLIC_DB_PROVIDER || "";

  if (!dbProvider) {
    dbProvider = "planetscale";
    console.error(
      "❌ NEXT_PUBLIC_DB_PROVIDER is not set (refer to .env.example)",
    );

    // Set default DB provider based on DATABASE_URL
    // if NEXT_PUBLIC_DB_PROVIDER is not specified
    // todo: Find another way, because DATABASE_URL
    // todo: can't be accessed on the client-side.
    // const databaseUrl = env.DATABASE_URL;
    // if (databaseUrl?.startsWith("mysql://")) {
    //   dbProvider = "planetscale";
    // } else if (databaseUrl?.startsWith("postgres://")) {
    //   dbProvider = "neon";
    // }
  }

  // Assign schema based on the dbProvider
  if (dbProvider === "planetscale") {
    return schemaMysql;
  } else if (["railway", "vercel", "neon"].includes(dbProvider)) {
    return schemaPgsql;
  } else {
    console.error("❌ selectedSchema(): Unknown NEXT_PUBLIC_DB_PROVIDER");
    return schemaMysql;
  }
})();

// =======================================================
// Export tables based on the selected schema
// =======================================================

export const {
  accounts,
  addresses,
  carts,
  emails,
  orders,
  payments,
  products,
  sessions,
  stores,
  stripeEvent,
  todos,
  users,
  verificationTokens,
} = selectedSchema;

// =======================================================
// Export types based on the selected schema
// =======================================================

export type Address = typeof selectedSchema.addresses.$inferSelect;
export type Cart = typeof selectedSchema.carts.$inferSelect;
export type EmailPreference = typeof selectedSchema.emails.$inferSelect;
export type Order = typeof selectedSchema.orders.$inferSelect;
export type Payment = typeof selectedSchema.payments.$inferSelect;
export type Product = typeof selectedSchema.products.$inferSelect;
export type Store = typeof selectedSchema.stores.$inferSelect;
export type Todo = typeof selectedSchema.todos.$inferSelect;
export type User = typeof selectedSchema.users.$inferSelect;

export type NewAddress = typeof selectedSchema.addresses.$inferInsert;
export type NewCart = typeof selectedSchema.carts.$inferInsert;
export type NewEmailPreference = typeof selectedSchema.emails.$inferInsert;
export type NewOrder = typeof selectedSchema.orders.$inferInsert;
export type NewPayment = typeof selectedSchema.payments.$inferInsert;
export type NewProduct = typeof selectedSchema.products.$inferInsert;
export type NewStore = typeof selectedSchema.stores.$inferInsert;
export type NewTodo = typeof selectedSchema.todos.$inferInsert;

/**
 * Useful Database Commands:
 * – [Apply changes] pnpm mysql:push | pnpm pg:push
 * – [Generate migrations] pnpm mysql:generate | pnpm pg:generate
 * – [Execute generated migrations (not tested too much)] pg db:migrate
 * These commands facilitate managing database schema changes and migrations
 * across different environments, ensuring a streamlined development process.
 *
 * Learning resources:
 * @see https://authjs.dev/concepts/faq
 * @see https://authjs.dev/reference/adapter/drizzle
 * @see https://github.com/bs-oss/drizzle-orm-mono
 * @see https://neon.tech/docs/serverless/serverless-driver
 * @see https://orm.drizzle.team/docs/column-types/mysql
 * @see https://orm.drizzle.team/docs/column-types/pg
 * @see https://orm.drizzle.team/docs/custom-types
 * @see https://orm.drizzle.team/docs/goodies
 * @see https://orm.drizzle.team/docs/quick-mysql/planetscale
 * @see https://orm.drizzle.team/docs/quick-start
 * @see https://orm.drizzle.team/docs/sql-schema-declaration
 * @see https://youtu.be/qclv0iaq9zu
 *
 * Inspirations:
 * @see https://github.com/Alissonsleal/brapi/blob/main/db/schemas/tables/stripeEvent.ts
 * @see https://github.com/apestein/nextflix/blob/main/src/db/schema.ts
 * @see https://github.com/CodeWitchBella/songbook/blob/main/workers/src/db/drizzle.ts
 * @see https://github.com/georgwittberger/next-app-router-template/blob/main/src/schemas/todos.ts
 * @see https://github.com/jackblatch/onestopshop/blob/main/db/schema.ts
 * @see https://github.com/jherr/trpc-on-the-app-router/blob/main/src/db/schema.ts
 * @see https://github.com/mrevanzak/vivat-marketplace/blob/main/packages/db/schema/product.ts
 * @see https://github.com/rexfordessilfie/next-auth-account-linking/blob/main/src/lib/db/schema.ts
 * @see https://github.com/ryanmearns/taskify/blob/main/apps/app/src/db/schema.ts
 * @see https://github.com/sadmann7/skateshop/blob/main/src/db/schema.ts
 * @see https://github.com/saga-sanga/todo-trpc/blob/main/src/db/schema.ts
 */
