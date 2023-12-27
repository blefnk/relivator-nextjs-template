/** drizzle-schema-postgres | @see index.ts to learn more */

import type { AdapterAccount } from "@auth/core/adapters";
import type { CartItem, CheckoutItem, StoredFile } from "~/types";
import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  json,
  pgEnum,
  pgTableCreator,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type Stripe from "stripe";

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const modeEnum = pgEnum("mode", ["buyer", "seller"]);
export const categoryEnum = pgEnum("category", [
  "accessories",
  "furniture",
  "clothing",
  "tech",
]);

export const pgTable = pgTableCreator((name) => `acme_${name}`);

// @see src/app/[locale]/(auth)/auth/page.tsx
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email"),
  emailClerk: text("emailClerk"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").notNull().default("user"),
  mode: modeEnum("mode").notNull().default("buyer"),
  stripeCustomerId: text("stripeCustomerId"),
  stripePriceId: text("stripePriceId"),
  currentCartId: text("currentCartId"),
  stripeCurrentPeriodEnd: text("stripeCurrentPeriodEnd"),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToProducts: many(usersToProducts),
  capabilities: many(capabilities),
  accounts: many(accounts),
  products: many(products),
  stores: many(stores),
  todos: many(todos),
  carts: many(carts),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId").notNull(),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    id_token: text("id_token"),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token_expires_in: integer("refresh_token_expires_in"),
    refresh_token: text("refresh_token"),
    scope: text("scope"),
    session_state: text("session_state"),
    token_type: text("token_type"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const stripeEvent = pgTable("stripe", {
  id: text("id").notNull().primaryKey(),
  account: text("account"),
  api_version: text("api_version"),
  created: timestamp("created", { mode: "date" }),
  data: json("data").$type<Stripe.Event.Data>(),
  livemode: boolean("livemode"),
  object: text("object"),
  pending_webhooks: real("pending_webhooks"),
  request: json("request").$type<Stripe.Event.Request>(),
  type: text("type"),
});

export const todos = pgTable("todo", {
  id: serial("id").primaryKey(),
  position: integer("position").default(0),
  content: text("content").notNull(),
  done: boolean("done"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  userId: text("userId").notNull(),
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.userId],
    references: [users.email],
  }),
}));

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(false),
  stripeAccountId: text("stripeAccountId"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const storesRelations = relations(stores, ({ many, one }) => ({
  products: many(products),
  payments: many(payments),
  user: one(users, { fields: [stores.id], references: [users.id] }),
}));

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  storeId: integer("storeId").notNull().default(1),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: categoryEnum("category").notNull().default("clothing"),
  subcategory: text("subcategory"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: integer("inventory").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
  user: one(users, { fields: [products.storeId], references: [users.id] }),
}));

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: text("userId"),
  email: text("email"),
  clientSecret: text("clientSecret"),
  paymentIntentId: text("paymentIntentId"),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, { fields: [carts.id], references: [users.id] }),
  store: one(stores, { fields: [carts.id], references: [stores.id] }),
}));

export const emails = pgTable("emails", {
  id: serial("id").primaryKey(),
  userId: text("userId"),
  email: text("email").notNull(),
  token: text("token").notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  storeId: integer("storeId").notNull(),
  stripeAccountId: text("stripeAccountId").notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] }),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  storeId: integer("storeId").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: integer("quantity"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: text("stripePaymentIntentId").notNull(),
  stripePaymentIntentStatus: text("stripePaymentIntentStatus").notNull(),
  name: text("name"),
  email: text("email"),
  addressId: integer("addressId"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  line1: text("line1"),
  line2: text("line2"),
  city: text("city"),
  state: text("state"),
  postalCode: text("postalCode"),
  country: text("country"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const usersToProducts = pgTable(
  "users_to_products",
  {
    userId: text("user_id").notNull(),
    productId: text("product_id").notNull(),
  },
  (usersToProducts) => ({
    compoundKey: primaryKey({
      columns: [usersToProducts.userId, usersToProducts.productId],
    }),
  }),
);

export const usersToProductsRelations = relations(
  usersToProducts,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToProducts.userId],
      references: [users.id],
    }),
    product: one(products, {
      fields: [usersToProducts.productId],
      references: [products.id],
    }),
  }),
);

export const guests = pgTable("guest", {
  id: text("id").notNull().primaryKey(),
  email: text("email"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const guestsRelations = relations(users, ({ many }) => ({
  usersToProducts: many(usersToProducts),
  products: many(products),
  todos: many(todos),
  carts: many(carts),
}));

export const capabilities = pgTable("capabilities", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  promoteUsers: boolean("promote_users").notNull().default(false),
  removeUsers: boolean("remove_users").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const capabilitiesRelations = relations(capabilities, ({ one }) => ({
  user: one(users, {
    fields: [capabilities.userId],
    references: [users.id],
  }),
}));
