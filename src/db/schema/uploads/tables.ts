import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "../users/tables";

export const mediaTypeEnum = pgEnum("media_type", ["image", "video"]);

export const uploadsTable = pgTable("uploads", {
  id: text("id").primaryKey(),
  key: text("key").notNull(), // UploadThing file key
  url: text("url").notNull(), // UploadThing file URL
  type: mediaTypeEnum("type").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
