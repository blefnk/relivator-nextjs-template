import type { AdapterAccount } from "@auth/core/adapters";
import type { CartItem, CheckoutItem, StoredFile } from "~/types";
import { relations } from "drizzle-orm";
import {
  boolean,
  customType,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  mysqlTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core";

/**
 * =======================================================================
 * SCHEMA: ACCOUNT
 * =======================================================================
 */

export const pgTable = mysqlTableCreator((name) => {
  /**
   * Modify default Auth.js tables
   * to have plural and snake case
   */
  switch (name) {
    case "user":
      return "users";
    case "account":
      return "accounts";
    case "session":
      return "sessions";
    case "verificationToken":
      return "verification_tokens";
    default:
      return name;
  }
});

export const users = mysqlTable("user", {
  id: varchar("id", { length: 191 }).notNull().primaryKey(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3
  }).defaultNow(),
  image: varchar("image", { length: 191 })
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 191 }),
    access_token: varchar("access_token", { length: 191 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 191 }),
    scope: varchar("scope", { length: 191 }),
    id_token: varchar("id_token", { length: 191 }),
    session_state: varchar("session_state", { length: 191 })
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId)
  })
);

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}));

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 191 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull()
});

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 191 }).notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
);

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;

/**
 * =======================================================================
 * SCHEMA: STORE
 * =======================================================================
 */

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(false),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow()
});

export type Store = typeof stores.$inferSelect;
export type NewStore = typeof stores.$inferInsert;

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  payments: many(payments)
}));

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: mysqlEnum("category", [
    "skateboards",
    "clothing",
    "shoes",
    "accessories"
  ])
    .notNull()
    .default("skateboards"),
  subcategory: varchar("subcategory", { length: 191 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: int("inventory").notNull().default(0),
  rating: int("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  storeId: int("storeId").notNull(),
  createdAt: timestamp("createdAt").defaultNow()
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] })
}));

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  checkoutSessionId: varchar("checkoutSessionId", { length: 191 }),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow()
});

export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;

export const emailPreferences = mysqlTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow()
});

export type EmailPreference = typeof emailPreferences.$inferSelect;
export type NewEmailPreference = typeof emailPreferences.$inferInsert;

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  storeId: int("storeId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt"),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow()
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] })
}));

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  storeId: int("storeId").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  total: decimal("total", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 191
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 191
  }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: int("addressId"),
  createdAt: timestamp("createdAt").defaultNow()
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow()
});

export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
