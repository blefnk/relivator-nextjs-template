import { integer, text } from "drizzle-orm/sqlite-core";

import { lifecycleDates } from "~/db/schema/extends/sqlite";
import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const notifications = createTable("notification", {
  id: text("id", { length: 30 })
    .$defaultFn(() => genId("notification"))
    .primaryKey(), // prefix_ + nanoid (12)
  communication: integer("communication", { mode: "boolean" })
    .default(false)
    .notNull(),
  email: text("email", { length: 255 }).notNull().unique(),
  marketing: integer("marketing", { mode: "boolean" }).default(false).notNull(),
  newsletter: integer("newsletter", { mode: "boolean" })
    .default(false)
    .notNull(),
  referredBy: text("referredBy", { length: 255 }),
  token: text("token", { length: 255 }).notNull().unique(),
  userId: text("userId", { length: 36 }), // uuid v4
  ...lifecycleDates,
});
