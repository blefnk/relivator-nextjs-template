import type {
  CartItem,
  CheckoutItem,
  StoredFile,
} from "@/types/reliverse/store";
import type { AdapterAccount } from "next-auth/adapters";
import type Stripe from "stripe";

import { sql } from "drizzle-orm";
import { index, integer, primaryKey, text } from "drizzle-orm/sqlite-core";

import { lifecycleDates } from "~/db/schema/extends/sqlite";
import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const addresses = createTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("address")),
  city: text("city"),
  country: text("country"),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
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
  closed: integer("closed", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  email: text("email"),
  items: text("items", {
    mode: "json",
  })
    .$type<CartItem[] | null>()
    .default(null),
  paymentIntentId: text("paymentIntentId"),
  userId: text("userId"),
});

export const posts = createTable(
  "post",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => genId("post")),
    name: text("name", {
      length: 256,
    }),
    createdAt: integer("created_at", {
      mode: "timestamp",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdById: text("createdById", {
      length: 255,
    })
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    updatedAt: integer("updatedAt", {
      mode: "timestamp",
    }),
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
  created: integer("created", {
    mode: "timestamp",
  }),
  data: text("data", {
    length: 255,
  }).$type<Stripe.Event.Data>(),
  livemode: integer("livemode", {
    mode: "boolean",
  }),
  object: text("object"),
  pending_webhooks: text("pending_webhooks"),
  request: text("request", {
    mode: "json",
  }).$type<Stripe.Event.Request>(),
  type: text("type"),
});

export const todos = createTable("todo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("todo")),
  content: text("content").notNull(),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  done: integer("done", {
    mode: "boolean",
  }),
  position: integer("position").default(0),
  userId: text("userId").notNull(),
});

export const notifications = createTable("notification", {
  id: text("id", { length: 30 })
    .$defaultFn(() => genId("notification"))
    .primaryKey(),
  communication: integer("communication", { mode: "boolean" })
    .default(false)
    .notNull(),
  email: text("email", { length: 255 }).notNull().unique(),
  marketing: integer("marketing", { mode: "boolean" }).default(false).notNull(),
  newsletter: integer("newsletter", { mode: "boolean" })
    .default(false)
    .notNull(),
  referredBy: text("referredBy", { length: 255 }),
  token: text("token", { length: 255 }).notNull().unique(),
  userId: text("userId", { length: 36 }),
  ...lifecycleDates,
});

export const orders = createTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("order")),
  name: text("name"),
  addressId: integer("addressId"),
  amount: integer("amount").notNull().default(0),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  email: text("email"),
  items: text("items", {
    mode: "json",
  })
    .$type<CheckoutItem[] | null>()
    .default(null),
  quantity: integer("quantity"),
  storeId: integer("storeId").notNull(),
  stripePaymentIntentId: text("stripePaymentIntentId").notNull(),
  stripePaymentIntentStatus: text("stripePaymentIntentStatus").notNull(),
});

export const payments = createTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("payment")),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  detailsSubmitted: integer("detailsSubmitted", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  storeId: integer("storeId").notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  stripeAccountId: text("stripeAccountId").notNull(),
});

export const products = createTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("product")),
  name: text("name").notNull(),
  category: text("category", {
    enum: ["accessories", "furniture", "clothing", "tech"],
  }).default("clothing"),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  description: text("description"),
  images: text("images", {
    mode: "json",
  })
    .$type<null | StoredFile[]>()
    .default(null),
  inventory: integer("inventory").notNull().default(0),
  price: integer("price", {
    mode: "number",
  })
    .notNull()
    .default(0),
  rating: integer("rating").notNull().default(0),
  storeId: integer("storeId").notNull().default(1),
  subcategory: text("subcategory"),
  tags: text("tags", {
    mode: "json",
  })
    .$type<null | string[]>()
    .default(null),
});

export const stores = createTable("store", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("store")),
  name: text("name").notNull(),
  active: integer("active", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  description: text("description"),
  slug: text("slug"),
  stripeAccountId: text("stripeAccountId"),
  userId: text("userId").notNull(),
});

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
