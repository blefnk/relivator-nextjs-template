import type { AdapterAccount } from "next-auth/adapters";

import { sql } from "drizzle-orm";
import { index, integer, primaryKey, text } from "drizzle-orm/sqlite-core";

import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const users = createTable("user", {
  id: text("id", {
    length: 255,
  })
    .primaryKey()
    .$defaultFn(() => genId("user")),
  name: text("name", {
    length: 255,
  }).notNull(),
  createdAt: text("createdAt", {
    length: 255,
  }).default(sql`now()`),
  currentCartId: text("currentCartId"),
  email: text("email", {
    length: 255,
  }).notNull(),
  emailVerified: integer("emailVerified", {
    mode: "timestamp_ms",
  }),
  hashedPassword: text("hashedPassword", {
    length: 255,
  }),
  image: text("image", {
    length: 255,
  }),
  mode: text("mode", {
    enum: ["buyer", "seller"],
  }).default("buyer"),
  role: text("role", {
    enum: ["user", "admin"],
  }).default("user"),
  status: text("status", {
    enum: ["guest", "idle", "invisible", "no-disturb", "offline", "online"],
  }).default("offline"),
  stripeCurrentPeriodEnd: text("stripeCurrentPeriodEnd"),
  stripeCustomerId: text("stripeCustomerId"),
  stripePriceId: text("stripePriceId"),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  updatedAt: text("updatedAt", {
    length: 255,
  }).default(sql`now()`),
});

export const accounts = createTable(
  "account",
  {
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    id_token: text("id_token"),
    provider: text("provider", {
      length: 255,
    }).notNull(),
    providerAccountId: text("providerAccountId", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    scope: text("scope", {
      length: 255,
    }),
    session_state: text("session_state", {
      length: 255,
    }),
    token_type: text("token_type", {
      length: 255,
    }),
    type: text("type", {
      length: 255,
    })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    userId: text("userId", {
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
    expires: integer("expires", {
      mode: "timestamp",
    }).notNull(),
    sessionToken: text("sessionToken", {
      length: 255,
    })
      .notNull()
      .primaryKey(),
    userId: text("userId", {
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
    expires: integer("expires", {
      mode: "timestamp",
    }).notNull(),
    identifier: text("identifier", {
      length: 255,
    }).notNull(),
    token: text("token", {
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
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => genId("authenticator")),
    counter: integer("counter").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    credentialDeviceType: text("credentialDeviceType", {
      length: 255,
    }).notNull(),
    credentialID: text("credentialId", {
      length: 255,
    })
      .notNull()
      .unique(),
    credentialPublicKey: text("credentialPublicKey", {
      length: 255,
    }).notNull(),
    providerAccountId: text("providerAccountId", {
      length: 255,
    }).notNull(),
    transports: text("transports", {
      length: 255,
    }),
    userId: text("userId", {
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
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  email: text("email"),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }),
});

export const capabilities = createTable("capability", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("capability")),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  promoteUsers: integer("promote_users", {
    mode: "boolean",
  }).default(false),
  removeUsers: integer("remove_users", {
    mode: "boolean",
  }).default(false),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }),
  userId: text("userId").notNull(),
});
