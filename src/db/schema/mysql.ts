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
  int,
  json,
  mysqlEnum,
  primaryKey,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { lifecycleDates } from "~/db/schema/extends/mysql";
import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const addresses = createTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("address")),
  city: varchar("city", {
    length: 255,
  }),
  country: varchar("country", {
    length: 255,
  }),
  createdAt: timestamp("createdAt").defaultNow(),
  line1: varchar("line1", {
    length: 255,
  }),
  line2: varchar("line2", {
    length: 255,
  }),
  postalCode: varchar("postalCode", {
    length: 255,
  }),
  state: varchar("state", {
    length: 255,
  }),
});

export const carts = createTable("cart", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("cart")),
  clientSecret: varchar("clientSecret", {
    length: 255,
  }),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  email: varchar("email", {
    length: 255,
  }),
  items: json("items").$type<CartItem[] | null>().default(null),
  paymentIntentId: varchar("paymentIntentId", {
    length: 255,
  }),
  userId: varchar("userId", {
    length: 255,
  }),
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
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const boards = createTable(
  "board",
  {
    id: varchar("id", {
      length: 255,
    })
      .primaryKey()
      .$defaultFn(() => genId("board")),
    name: varchar("name", {
      length: 255,
    }).notNull(),
    color: varchar("color", {
      length: 255,
    }).notNull(),
    ownerId: varchar("owner_id", {
      length: 255,
    }).notNull(),
  },
  (table) => ({
    ownerIdx: index("board_owner_idx").on(table.ownerId),
  }),
);

export const columns = createTable(
  "column",
  {
    id: varchar("id", {
      length: 255,
    })
      .primaryKey()
      .$defaultFn(() => genId("column")),
    name: varchar("name", {
      length: 255,
    }).notNull(),
    boardId: varchar("board_id", {
      length: 255,
    }).notNull(),
    order: int("order").notNull(),
  },
  (table) => ({
    boardIdx: index("column_board_idx").on(table.boardId),
  }),
);

export const items = createTable(
  "item",
  {
    id: varchar("id", {
      length: 255,
    })
      .primaryKey()
      .$defaultFn(() => genId("item")),
    boardId: varchar("board_id", {
      length: 255,
    }).notNull(),
    columnId: varchar("column_id", {
      length: 255,
    }).notNull(),
    content: varchar("content", {
      length: 255,
    }),
    order: int("order").notNull(),
    title: varchar("title", {
      length: 255,
    }).notNull(),
  },
  (table) => ({
    boardIdx: index("item_board_idx").on(table.boardId),
    columnIdx: index("item_column_idx").on(table.columnId),
  }),
);

export const stripeEvent = createTable("stripe", {
  id: varchar("id", {
    length: 255,
  })
    .notNull()
    .primaryKey(),
  account: varchar("account", {
    length: 255,
  }),
  api_version: varchar("api_version", {
    length: 255,
  }),
  created: timestamp("created", {
    mode: "date",
  }),
  data: json("data").$type<Stripe.Event.Data>(),
  livemode: boolean("livemode"),
  object: varchar("object", {
    length: 255,
  }),
  pending_webhooks: real("pending_webhooks"),
  request: json("request").$type<Stripe.Event.Request>(),
  type: varchar("type", {
    length: 255,
  }),
});

export const todos = createTable("todo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("todo")),
  content: varchar("content", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  done: boolean("done"),
  position: int("position").default(0),
  userId: varchar("userId", {
    length: 255,
  }).notNull(),
});

export const notifications = createTable("notification", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => genId("notification"))
    .primaryKey(),
  communication: boolean("communication").default(false).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  marketing: boolean("marketing").default(false).notNull(),
  newsletter: boolean("newsletter").default(false).notNull(),
  referredBy: varchar("referredBy", { length: 255 }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  userId: varchar("userId", { length: 36 }),
  ...lifecycleDates,
});

export const orders = createTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("order")),
  name: varchar("name", {
    length: 255,
  }),
  addressId: int("addressId"),
  amount: int("amount").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  email: varchar("email", {
    length: 255,
  }),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: int("quantity"),
  storeId: int("storeId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 255,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 255,
  }).notNull(),
});

export const payments = createTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("payment")),
  createdAt: timestamp("createdAt").defaultNow(),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  storeId: int("storeId").notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt"),
  stripeAccountId: varchar("stripeAccountId", {
    length: 255,
  }).notNull(),
});

export const products = createTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("product")),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  category: mysqlEnum("category", [
    "accessories",
    "furniture",
    "clothing",
    "tech",
  ]).default("clothing"),
  createdAt: timestamp("createdAt").defaultNow(),
  description: varchar("description", {
    length: 255,
  }),
  images: json("images").$type<null | StoredFile[]>().default(null),
  inventory: int("inventory").notNull().default(0),
  price: int("price").notNull().default(0),
  rating: int("rating").notNull().default(0),
  storeId: int("storeId").notNull().default(1),
  subcategory: varchar("subcategory", {
    length: 255,
  }),
  tags: json("tags").$type<null | string[]>().default(null),
});

export const stores = createTable("store", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("store")),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  description: varchar("description", {
    length: 255,
  }),
  slug: varchar("slug", {
    length: 255,
  }),
  stripeAccountId: varchar("stripeAccountId", {
    length: 255,
  }),
  userId: varchar("userId", {
    length: 255,
  }).notNull(),
});

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
