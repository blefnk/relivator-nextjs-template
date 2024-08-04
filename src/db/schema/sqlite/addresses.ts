import { integer, text } from "drizzle-orm/sqlite-core";

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
