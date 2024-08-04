import { integer, text } from "drizzle-orm/sqlite-core";

import type { CartItem } from "~/types";

import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

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
