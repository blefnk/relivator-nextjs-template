import * as z from "zod";

export const searchParamsSchema = z.object({
  from: z.string().optional(),
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional().default("createdAt.desc"),
  to: z.string().optional(),
});

export const productsSearchParamsSchema = searchParamsSchema
  .omit({ from: true, to: true })
  .extend({
    active: z.string().optional().default("true"),
    categories: z.string().optional(),
    price_range: z.string().optional(),
    store_ids: z.string().optional(),
    store_page: z.coerce.number().default(1),
    subcategories: z.string().optional(),
    subcategory: z.string().optional(),
  });

export const storesProductsSearchParamsSchema = searchParamsSchema.extend({
  name: z.string().optional(),
  category: z.string().optional(),
});

export const storesSearchParamsSchema = searchParamsSchema
  .omit({ from: true, sort: true, to: true })
  .extend({
    sort: z.string().optional().default("productCount.desc"),
    statuses: z.string().optional(),
  });

export const purchasesSearchParamsSchema = searchParamsSchema
  .omit({ from: true, to: true })
  .extend({
    status: z.string().optional(),
    store: z.string().optional(),
  });

export const ordersSearchParamsSchema = searchParamsSchema.extend({
  customer: z.string().optional(),
  status: z.string().optional(),
});

export const customersSearchParamsSchema = searchParamsSchema.extend({
  email: z.string().optional(),
});

export const customerSearchParamsSchema = searchParamsSchema.extend({
  status: z.string().optional(),
});
