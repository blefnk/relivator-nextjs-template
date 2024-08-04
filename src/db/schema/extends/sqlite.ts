import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const lifecycleDates = {
  // createdAt: integer("createdAt", {
  //   mode: "timestamp",
  // }).notNull(),
  // updatedAt: integer("updatedAt", {
  //   mode: "timestamp",
  // }),
  createdAt: text("createdAt", {
    length: 255,
  })
    .default(sql`now()`)
    .notNull(),
  updatedAt: text("updatedAt", {
    length: 255,
  }).default(sql`now()`),
};
