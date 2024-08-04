import { pgTable, text } from "drizzle-orm/pg-core";

import { createdUpdatedAt } from "~/db/extends/pgsql";
import { users } from "~/db/schema/pgsql/users";
import { genId } from "~/db/utils";

export const postsTable = pgTable("post", {
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

export type InsertPost = typeof postsTable.$inferInsert;

export type SelectPost = typeof postsTable.$inferSelect;
