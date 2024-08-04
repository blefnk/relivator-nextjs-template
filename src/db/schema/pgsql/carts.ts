import { boolean, json, text, timestamp } from "drizzle-orm/pg-core";

import type { CartItem } from "~/types";

import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const carts = createTable("cart", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("cart")),
  clientSecret: text("clientSecret"),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  email: text("email"),
  items: json("items").$type<CartItem[] | null>().default(null),
  paymentIntentId: text("paymentIntentId"),
  userId: text("userId"),
});
