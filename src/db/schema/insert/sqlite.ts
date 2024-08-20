import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { boards, columns, items } from "~/db/schema/mysql";

// createInsertSchema
// ========================================================
export const createGeneralSchema = createInsertSchema(items, {
  id: z.string().startsWith("gen_"),
}).omit({});

export const createBoardSchema = createInsertSchema(boards, {
  color: z.string().regex(/^#[\da-f]{6}$/i),
}).omit({
  id: true,
  ownerId: true,
});

export const createColumnSchema = createInsertSchema(columns, {
  id: z.string().startsWith("col_"),
}).omit({
  order: true,
});

export const createItemSchema = createInsertSchema(items, {
  id: z.string().startsWith("itm_"),
  order: z.coerce.number(),
}).omit({});
