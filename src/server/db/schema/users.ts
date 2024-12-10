import type { InferSelectModel } from "drizzle-orm";

import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { generateId } from "~/server/id";

// export const createTable = pgTableCreator((name) => name);
// export const modeEnum = pgEnum("mode", ["buyer", "seller"]);
// export const roleEnum = pgEnum("role", ["user", "admin"]);
// export const statusEnum = pgEnum("status", [
//   "guest",
//   "idle",
//   "invisible",
//   "no-disturb",
//   "offline",
//   "online",
// ]);

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 255 }) // 30
    .$defaultFn(() => generateId())
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  currentStoreId: varchar("current_store_id", { length: 30 })
    .notNull()
    .default(""),
});

// currentCartId: text("currentCartId"),
// emailVerified: timestamp("emailVerified", {
//   mode: "date",
// }).default(sql`CURRENT_TIMESTAMP`),
// hashedPassword: text("hashedPassword"),
// image: text("image"),
// mode: modeEnum("mode").default("buyer"),
// role: roleEnum("role").default("user"),
// status: statusEnum("status").default("offline"),
// stripeCurrentPeriodEnd: text("stripeCurrentPeriodEnd"),
// stripeCustomerId: text("stripeCustomerId"),
// stripePriceId: text("stripePriceId"),
// stripeSubscriptionId: text("stripeSubscriptionId"),
// ...lifecycleDates,

export type User = InferSelectModel<typeof usersTable>;

// export const usersTableRelations = relations(usersTable, ({ many }) => ({
//   carts: many(carts),
//   products: many(products),
//   stores: many(stores),
// }));
