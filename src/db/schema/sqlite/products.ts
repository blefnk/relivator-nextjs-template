import { integer, text } from "drizzle-orm/sqlite-core";

import type { StoredFile } from "~/types";

import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

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
