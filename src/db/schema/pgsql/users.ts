import type { AdapterAccountType } from "next-auth/adapters";

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { createdUpdatedAt } from "~/db/extends/pgsql";
import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

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

export type InsertUser = typeof users.$inferInsert;

export type SelectUser = typeof users.$inferSelect;

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
