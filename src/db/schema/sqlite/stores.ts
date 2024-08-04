import { integer, text } from "drizzle-orm/sqlite-core";

import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

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
