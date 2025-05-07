import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { userTable } from "../users/tables";

export const mediaTypeEnum = pgEnum("type", ["image", "video"]);

export const uploadsTable = pgTable("uploads", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  id: text("id").primaryKey(),
  key: text("key").notNull(), // UploadThing file key
  type: mediaTypeEnum("type").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  url: text("url").notNull(), // UploadThing file URL
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});
