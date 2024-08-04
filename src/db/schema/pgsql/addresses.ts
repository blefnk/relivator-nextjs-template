import { text, timestamp } from "drizzle-orm/pg-core";

import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const addresses = createTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("address")),
  city: text("city"),
  country: text("country"),
  createdAt: timestamp("createdAt").defaultNow(),
  line1: text("line1"),
  line2: text("line2"),
  postalCode: text("postalCode"),
  state: text("state"),
});
