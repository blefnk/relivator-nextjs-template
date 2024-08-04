import type Stripe from "stripe";

import { sql } from "drizzle-orm";
import { index, integer, text } from "drizzle-orm/sqlite-core";

import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { users } from "~/db/schema/sqlite/users";
import { genId } from "~/db/utils";

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
