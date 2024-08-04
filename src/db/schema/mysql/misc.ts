import type Stripe from "stripe";

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  json,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { users } from "~/db/schema/mysql/users";
import { genId } from "~/db/utils";

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
