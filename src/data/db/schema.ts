/**
 * drizzle orm single schema file for pg database
 *
 * – You can just use `pnpm db:push` to apply database changes.
 * – Use `pnpm db:generate` and `pnpm db:migrate` for migrations.
 *
 * @see https://orm.drizzle.team/docs/quick-start
 * @see https://orm.drizzle.team/docs/column-types/pg
 */

import type { AdapterAccount } from "@auth/core/adapters";
import { createId } from "@paralleldrive/cuid2";
import type { CartItem, CheckoutItem, StoredFile } from "~/types";
import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import Stripe from "stripe";

import { planTuple } from "~/server/config/subscriptions2";

/**
 * @module drizzle-schema-accounts
 *
 * todo: each user needs to have main email-
 * todo: address by initial account creation
 *
 * todo: implement if user was deleted then
 * todo: del all associated with user stuff
 *
 * todo: get data from first `account` as .default()
 *
 * @see https://orm.drizzle.team/docs/column-types/pg#default-value
 * @see https://orm.drizzle.team/docs/sql-schema-declaration
 * @see https://authjs.dev/reference/adapter/drizzle
 * @module src/server/config/subscriptions2.ts
 */

export const subscriptionEnum = pgEnum("subscription", planTuple);

export const users = pgTable(
  "user",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    provider: text("provider").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    email: text("email").default("fake.data@gmail.com"),
    name: text("name").default("Fake Temp Data Name"),
    image: text("image").default("https://relivator.bleverse.com/logo.png"),
    // !! [STRIPE] =======================================================
    subscriptionPlan: subscriptionEnum("subscription").default("Starter"),
    isSubscribed: boolean("isSubscribed").default(false).notNull(),
    isCanceled: boolean("isCanceled").default(false).notNull(),
    stripeSubscriptionStatus: text("stripeSubscriptionStatus"),
    stripeSubscriptionId: text("stripeSubscriptionId"),
    stripeCustomerId: text("stripe_customer_id"),
    activeAccountId: text("active_account_id"),
    stripePriceId: text("stripePriceId"),
    stripeSubscriptionCurrentPeriodStart: timestamp(
      "stripeSubscriptionCurrentPeriodStart",
      { mode: "date" },
    ),
    stripeSubscriptionCurrentPeriodEnd: timestamp(
      "stripeSubscriptionCurrentPeriodEnd",
      { mode: "date" },
    ),
    // !! ================================================================
  },
  (table) => {
    return {
      activeAccountIdx: uniqueIndex("active_account_idx").on(
        table.activeAccountId,
      ),
    };
  },
);

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  activeAccount: one(accounts, {
    fields: [users.activeAccountId],
    references: [accounts.id],
  }),
  todos: many(todos),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/**
 * @see https://github.com/rexfordessilfie/next-auth-account-linking
 * @see https://github.com/Apestein/nextflix/blob/main/src/db/schema.ts
 */
export const accounts = pgTable(
  "account",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    provider: text("provider").notNull(),
    email: text("email").notNull(),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    refresh_token_expires_in: integer("refresh_token_expires_in"),
    refresh_token: text("refresh_token"),
    session_state: text("session_state"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    id_token: text("id_token"),
    scope: text("scope"),
    image: text("image"),
    name: text("name"),
  },
  (table) => ({
    unq: unique().on(table.userId, table.name),
    userIdIdx: index("user_id_idx").on(table.userId),
    compoundKey: primaryKey(table.provider, table.providerAccountId),
  }),
);

export const accountsRelation = relations(accounts, ({ one, many }) => ({
  ownerUser: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
  // todo: implement this relation
  // likedComments: many(comments),
}));

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export const sessions = pgTable("session", {
  sessionToken: serial("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;

/**
 * @module drizzle-schema-ecommerce
 *
 * @see https://github.com/Apestein/nextflix/blob/main/src/db/schema.ts
 * @see https://github.com/Alissonsleal/brapi/blob/main/db/schemas/tables/stripeEvent.ts
 */

export const stripeEvent = pgTable("StripeEvent", {
  id: text("id").notNull().primaryKey(),
  api_version: text("api_version"),
  data: json("data").$type<Stripe.Event.Data>(),
  request: json("request").$type<Stripe.Event.Request>(),
  type: text("type"),
  object: text("object"),
  account: text("account"),
  created: timestamp("created", { mode: "date" }),
  livemode: boolean("livemode"),
  pending_webhooks: real("pending_webhooks"),
});

// todo: implement this model (currently is not finished)
export const commentsTypeEnum = pgEnum("comments_type", ["question", "review"]);

export const comments = pgTable(
  "comments",
  {
    id: integer("id"),
    commentType: commentsTypeEnum("comment_type"),
    // accountId: text("account_id")
    //   .references(() => accounts.id, { onDelete: "cascade" }),
  },
  // (table) => {
  //   return {
  //     accountIdIdx: index("account_id_idx").on(table.accountId),
  //     pk: primaryKey(table.id, table.accountId),
  //   };
  // },
);

// export const commentsRelation = relations(comments, ({ one }) => ({
//   account: one(accounts, {
//     fields: [comments.accountId],
//     references: [accounts.id],
//   }),
// }));

/**
 * @module drizzle-schema-specifics
 *
 * todo: currently schema below are exists just as trpc example
 * todo: but in the feature we can implement something using it
 * todo: like workspace's store with management of products etc
 *
 * @see https://github.com/georgwittberger/next-app-router-template
 * @see https://github.com/jherr/trpc-on-the-app-router
 * @see https://github.com/saga-sanga/todo-trpc
 * @see https://github.com/ryanmearns/taskify
 */

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

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;

/**
 * @module drizzle-schema-products
 *
 * todo: move enum from here to separate file e.g app.ts and import here
 *
 * @see https://github.com/sadmann7/skateshop/blob/main/src/db/schema.ts
 * @see https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
 */

export const categoryEnum = pgEnum("category", [
  "accessories",
  "clothing",
  "pants",
  "shoes",
]);

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: json("content"),
  slug: text("slug"),
  published: boolean("active").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

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

export type Store = typeof stores.$inferSelect;
export type NewStore = typeof stores.$inferInsert;

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  payments: many(payments),
}));

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: categoryEnum("category").notNull().default("clothing"),
  subcategory: text("subcategory"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: integer("inventory").notNull().default(0),
  stripeAccountId: text("stripeAccountId"),
  rating: integer("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  storeId: integer("storeId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}));

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  checkoutSessionId: text("checkoutSessionId"),
  paymentIntentId: text("paymentIntentId"),
  clientSecret: text("clientSecret"),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;

export const emailPreferences = pgTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: text("userId"),
  email: text("email").notNull(),
  token: text("token").notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type EmailPreference = typeof emailPreferences.$inferSelect;
export type NewEmailPreference = typeof emailPreferences.$inferInsert;

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: text("userId"),
  storeId: integer("storeId").notNull(),
  stripeAccountId: text("stripeAccountId").notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] }),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("userId"),
  storeId: integer("storeId").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  total: decimal("total", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: text("stripePaymentIntentId").notNull(),
  stripePaymentIntentStatus: text("stripePaymentIntentStatus").notNull(),
  name: text("name"),
  email: text("email"),
  addressId: integer("addressId"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

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

export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
