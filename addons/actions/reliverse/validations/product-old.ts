import * as z from "zod";

import { products } from "~/db/schema/provider";

export const productSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  category: z
    .enum(products.category.enumValues, {
      required_error: "Must be a valid category",
    })
    .default(products.category.enumValues[0]),
  description: z.string().optional(),
  images: z
    .unknown()
    .refine((value) => {
      if (!Array.isArray(value)) {
        return false;
      }

      // if (value.some((file) => !(file instanceof File))) {
      //   return false;
      // }
      return !value.some((file) => !(file instanceof File));
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
  inventory: z.number(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  subcategory: z.string().optional().nullable(),
});

export const filterProductsSchema = z.object({
  query: z.string(),
});

export const getProductSchema = z.object({
  id: z.number(),
  storeId: z.number(),
});

export const getProductInventorySchema = z.object({
  id: z.number(),
});

export const getProductsSchema = z.object({
  categories: z.string().optional().nullable(),
  limit: z.number().default(10),
  offset: z.number().default(0),
  page: z.number().default(1),
  price_range: z.string().optional().nullable(),
  sort: z.string().optional().nullable(),
  store_ids: z.string().optional().nullable(),
  subcategories: z.string().optional().nullable(),
});
