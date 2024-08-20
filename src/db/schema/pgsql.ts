import type {
  CartItem,
  CheckoutItem,
  StoredFile,
} from "@/types/reliverse/store";
import type { AdapterAccountType } from "next-auth/adapters";
import type Stripe from "stripe";

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  json,
  pgEnum,
  primaryKey,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { createdUpdatedAt } from "~/db/extends/pgsql";
import { lifecycleDates } from "~/db/schema/extends/pgsql";
import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const addresses = createTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("address")),
  city: text("city"),
  country: text("country"),
  createdAt: timestamp("createdAt").defaultNow(),
  line1: text("line1"),
  line2: text("line2"),
  postalCode: text("postalCode"),
  state: text("state"),
});

export const carts = createTable("cart", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("cart")),
  clientSecret: text("clientSecret"),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  email: text("email"),
  items: json("items").$type<CartItem[] | null>().default(null),
  paymentIntentId: text("paymentIntentId"),
  userId: text("userId"),
});

export const posts = createTable(
  "post",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => genId("post")),
    name: varchar("name", {
      length: 256,
    }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdById: varchar("createdById", {
      length: 255,
    })
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const boards = createTable(
  "board",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => genId("board")),
    name: text("name").notNull(),
    color: text("color").notNull(),
    ownerId: text("owner_id").notNull(),
  },
  (table) => ({
    ownerIdx: index("board_owner_idx").on(table.ownerId),
  }),
);

export const columns = createTable(
  "column",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => genId("column")),
    name: text("name").notNull(),
    boardId: text("board_id").notNull(),
    order: integer("order").notNull(),
  },
  (table) => ({
    boardIdx: index("column_board_idx").on(table.boardId),
  }),
);

export const items = createTable(
  "item",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => genId("item")),
    boardId: text("board_id").notNull(),
    columnId: text("column_id").notNull(),
    content: text("content"),
    order: integer("order").notNull(),
    title: text("title").notNull(),
  },
  (table) => ({
    boardIdx: index("item_board_idx").on(table.boardId),
    columnIdx: index("item_column_idx").on(table.columnId),
  }),
);

export const stripeEvent = createTable("stripe", {
  id: text("id").notNull().primaryKey(),
  account: text("account"),
  api_version: text("api_version"),
  created: timestamp("created", {
    mode: "date",
  }),
  data: json("data").$type<Stripe.Event.Data>(),
  livemode: boolean("livemode"),
  object: text("object"),
  pending_webhooks: real("pending_webhooks"),
  request: json("request").$type<Stripe.Event.Request>(),
  type: text("type"),
});

export const todos = createTable("todo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("todo")),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
  }).defaultNow(),
  done: boolean("done"),
  position: integer("position").default(0),
  userId: text("userId").notNull(),
});

export const notifications = createTable("notification", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => genId("notification"))
    .primaryKey(),
  communication: boolean("communication").default(false).notNull(),
  email: text("email").notNull().unique(),
  marketing: boolean("marketing").default(false).notNull(),
  newsletter: boolean("newsletter").default(false).notNull(),
  referredBy: text("referredBy"),
  token: text("token").notNull().unique(),
  userId: varchar("userId", { length: 36 }),
  ...lifecycleDates,
});

export const orders = createTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("order")),
  name: text("name"),
  addressId: integer("addressId"),
  amount: integer("amount").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  email: text("email"),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: integer("quantity"),
  storeId: integer("storeId").notNull(),
  stripePaymentIntentId: text("stripePaymentIntentId").notNull(),
  stripePaymentIntentStatus: text("stripePaymentIntentStatus").notNull(),
});

export const payments = createTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("payment")),
  createdAt: timestamp("createdAt").defaultNow(),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  storeId: integer("storeId").notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  stripeAccountId: text("stripeAccountId").notNull(),
});

export const postsTable = createTable("post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("post")),
  content: text("content").notNull(),
  title: text("title").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...createdUpdatedAt,
});

export const categoryEnum = pgEnum("category", [
  "accessories",
  "furniture",
  "clothing",
  "tech",
]);

export const products = createTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("product")),
  name: text("name").notNull(),
  category: categoryEnum("category").default("clothing"),
  createdAt: timestamp("createdAt").defaultNow(),
  description: text("description"),
  images: json("images").$type<null | StoredFile[]>().default(null),
  inventory: integer("inventory").notNull().default(0),
  price: integer("price").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  storeId: integer("storeId").notNull().default(1),
  subcategory: text("subcategory"),
  tags: json("tags").$type<null | string[]>().default(null),
});

export const stores = createTable("store", {
  id: varchar("id", {
    length: 30,
  })
    .$defaultFn(() => genId("store"))
    .primaryKey(),
  name: text("name").notNull(),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  description: text("description"),
  slug: text("slug"),
  stripeAccountId: text("stripeAccountId"),
  userId: text("userId").notNull(),
});

export const modeEnum = pgEnum("mode", ["buyer", "seller"]);

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const statusEnum = pgEnum("status", [
  "guest",
  "idle",
  "invisible",
  "no-disturb",
  "offline",
  "online",
]);

export const users = createTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("user")),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  currentCartId: text("currentCartId"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  hashedPassword: text("hashedPassword"),
  image: text("image"),
  mode: modeEnum("mode").default("buyer"),
  role: roleEnum("role").default("user"),
  status: statusEnum("status").default("offline"),
  stripeCurrentPeriodEnd: text("stripeCurrentPeriodEnd"),
  stripeCustomerId: text("stripeCustomerId"),
  stripePriceId: text("stripePriceId"),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  ...createdUpdatedAt,
});

export const accounts = createTable(
  "account",
  {
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    id_token: text("id_token"),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    scope: text("scope"),
    session_state: text("session_state"),
    token_type: text("token_type"),
    type: text("type").$type<AdapterAccountType>().notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

// export type InsertUser = typeof users.$inferInsert;

// export type SelectUser = typeof users.$inferSelect;

export const sessions = createTable(
  "session",
  {
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const verificationTokens = createTable(
  "verificationToken",
  {
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  }),
);

export const authenticators = createTable(
  "authenticator",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => genId("authenticator")),
    counter: integer("counter").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialID: text("credentialId").notNull().unique(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    transports: text("transports"),
    userId: text("userId").notNull(),
  },
  (authenticator) => ({
    userIdIdx: index("userId_idx").on(authenticator.userId),
  }),
);

export const guests = createTable("guest", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => genId("guest")),
  createdAt: timestamp("createdAt").defaultNow(),
  email: text("email"),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const capabilities = createTable("capability", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("capability")),
  createdAt: timestamp("createdAt").defaultNow(),
  promoteUsers: boolean("promote_users").default(false),
  removeUsers: boolean("remove_users").default(false),
  updatedAt: timestamp("updatedAt").defaultNow(),
  userId: text("userId").notNull(),
});
