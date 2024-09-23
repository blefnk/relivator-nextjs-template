import * as z from "zod";

import { slugify } from "~/server/helpers/utils";

export const createStoreSchema = z
  .object({
    name: z.string().min(3).max(50),
    description: z.string().optional(),
    slug: z.string().optional(),
  })
  .refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.name);
    }

    return true;
  });

export const getStoreSchema = z.object({
  id: z.number(),
  userId: z.string(),
});

export const getStoresSchema = z.object({
  active: z.string().optional().default("true"),
  categories: z.string().optional(),
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  price_range: z.string().optional(),
  sort: z.string().optional().default("productCount.desc"),
  statuses: z.string().optional(),
  store_ids: z.string().optional(),
  store_page: z.coerce.number().default(1),
  subcategories: z.string().optional(),
  subcategory: z.string().optional(),
  user_id: z.string().optional(),
});

export const updateStoreSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
});

export type CreateStoreSchema = z.infer<typeof createStoreSchema>;

export type GetStoreSchema = z.infer<typeof getStoreSchema>;

export type GetStoresSchema = z.infer<typeof getStoresSchema>;

export type UpdateStoreSchema = z.infer<typeof updateStoreSchema>;
