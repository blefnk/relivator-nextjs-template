import * as z from "zod";

export const storeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
});

export const getStoreSchema = z.object({
  id: z.number(),
  userId: z.string(),
});

export const getStoresSchema = z.object({
  description: z.string().optional(),
  limit: z.number().default(10).optional(),
  offset: z.number().default(0).optional(),
  page: z.number().default(1).optional(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  statuses: z
    .string()
    .regex(
      /^\d(?:\d?[^\d\n\r\u2028\u2029]\d+|\d{2,}(?:[^\d\n\r\u2028\u2029]\d+)?)$/,
    )
    .optional()
    .nullable(),
  userId: z.string().optional(),
});
