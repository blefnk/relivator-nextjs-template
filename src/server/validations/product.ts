import * as z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  categoryId: z.string(),
  description: z.string().optional(),
  images: z
    .custom<File[] | null | undefined>()
    .optional()
    .nullable()
    .default(null),
  inventory: z.number(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  subcategoryId: z.string().optional().nullable(),
});

export const updateProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  categoryId: z.string(),
  description: z.string().optional(),
  images: z
    .custom<File[] | null | undefined>()
    .optional()
    .nullable()
    .default(null),
  inventory: z.number(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  subcategoryId: z.string().optional().nullable(),
});

export const filterProductsSchema = z.object({
  query: z.string(),
});

export const getProductInventorySchema = z.object({
  id: z.string(),
});

export const getProductsSchema = z.object({
  active: z.string().optional().default("true"),
  categories: z.string().optional(),
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  price_range: z.string().optional(),
  sort: z.string().optional().default("createdAt.desc"),
  store_ids: z.string().optional(),
  store_page: z.coerce.number().default(1),
  subcategories: z.string().optional(),
  subcategory: z.string().optional(),
});

export const updateProductRatingSchema = z.object({
  id: z.string(),
  rating: z.number(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export type FilterProductsSchema = z.infer<typeof filterProductsSchema>;

export type GetProductInventorySchema = z.infer<
  typeof getProductInventorySchema
>;

export type GetProductsSchema = z.infer<typeof getProductsSchema>;

export type UpdateProductRatingSchema = z.infer<
  typeof updateProductRatingSchema
>;
