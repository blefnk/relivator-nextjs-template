import { boolean, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const stores = createTable("store", {
  id: varchar("id", {
    length: 30,
  })
    .$defaultFn(() => genId("store"))
    .primaryKey(), // prefix_ + nanoid (12)
  // id: text("id")
  //   .primaryKey()
  name: text("name").notNull(),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  description: text("description"),
  slug: text("slug"),
  stripeAccountId: text("stripeAccountId"),

  //   .$defaultFn(() => genId("ctx")),
  userId: text("userId").notNull(),
});
