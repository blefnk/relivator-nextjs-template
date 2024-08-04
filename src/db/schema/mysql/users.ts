import type { AdapterAccountType } from "next-auth/adapters";

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  mysqlEnum,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const users = createTable("user", {
  id: varchar("id", {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(() => genId("user")),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("createdAt").default(sql`now()`),
  currentCartId: varchar("currentCartId", {
    length: 255,
  }),
  email: varchar("email", {
    length: 255,
  }).notNull(),
  emailVerified: timestamp("emailVerified", {
    fsp: 3,
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  hashedPassword: varchar("hashedPassword", {
    length: 255,
  }),
  image: varchar("image", {
    length: 255,
  }),
  mode: mysqlEnum("mode", ["seller", "buyer"]).default("buyer"),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
  status: mysqlEnum("status", [
    "guest",
    "idle",
    "invisible",
    "no-disturb",
    "offline",
    "online",
  ]).default("offline"),
  stripeCurrentPeriodEnd: varchar("stripeCurrentPeriodEnd", {
    length: 255,
  }),
  stripeCustomerId: varchar("stripeCustomerId", {
    length: 255,
  }),
  stripePriceId: varchar("stripePriceId", {
    length: 255,
  }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", {
    length: 255,
  }),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
});

export const accounts = createTable(
  "account",
  {
    access_token: varchar("access_token", {
      length: 255,
    }),
    expires_at: int("expires_at"),
    id_token: varchar("id_token", {
      length: 2048,
    }),
    provider: varchar("provider", {
      length: 255,
    }).notNull(),
    providerAccountId: varchar("providerAccountId", {
      length: 255,
    }).notNull(),
    refresh_token: varchar("refresh_token", {
      length: 255,
    }),
    scope: varchar("scope", {
      length: 255,
    }),
    session_state: varchar("session_state", {
      length: 255,
    }),
    token_type: varchar("token_type", {
      length: 255,
    }),
    type: varchar("type", {
      length: 255,
    })
      .$type<AdapterAccountType>()
      .notNull(),
    userId: varchar("userId", {
      length: 255,
    })
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

export const sessions = createTable(
  "session",
  {
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
    sessionToken: varchar("sessionToken", {
      length: 255,
    })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", {
      length: 255,
    })
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
    identifier: varchar("identifier", {
      length: 255,
    }).notNull(),
    token: varchar("token", {
      length: 255,
    }).notNull(),
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
    id: varchar("id", {
      length: 255,
    })
      .notNull()
      .primaryKey()
      .$defaultFn(() => genId("authenticator")),
    counter: int("counter").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    credentialDeviceType: varchar("credentialDeviceType", {
      length: 255,
    }).notNull(),
    credentialID: varchar("credentialId", {
      length: 255,
    })
      .notNull()
      .unique(),
    credentialPublicKey: varchar("credentialPublicKey", {
      length: 255,
    }).notNull(),
    providerAccountId: varchar("providerAccountId", {
      length: 255,
    }).notNull(),
    transports: varchar("transports", {
      length: 255,
    }),
    userId: varchar("userId", {
      length: 255,
    }).notNull(),
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
  email: varchar("email", {
    length: 255,
  }),
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
  userId: varchar("userId", {
    length: 255,
  }).notNull(),
});
