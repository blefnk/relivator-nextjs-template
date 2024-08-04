import type Stripe from "stripe";

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  json,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { pgTable as createTable } from "~/db/schema/insert/table";
import { users } from "~/db/schema/pgsql/users";
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
