import * as z from "zod";

export const SearchParametersSchema = z.object({
  page: z.string().default("1"),
  per_page: z.string().default("10"),
});

export const productsSearchParametersSchema = SearchParametersSchema.extend({
  categories: z.string().optional(),
  price_range: z.string().optional(),
  sort: z.string().optional().default("createdAt.desc"),
  store_ids: z.string().optional(),
  store_page: z.string().optional(),
  subcategories: z.string().optional(),
});

export const dashboardProductsSearchParametersSchema =
  SearchParametersSchema.extend({
    name: z.string().optional(),
    category: z.string().optional(),
    from: z.string().optional(),
    sort: z.string().optional().default("createdAt.desc"),
    to: z.string().optional(),
  });

export const storesSearchParametersSchema = SearchParametersSchema.extend({
  sort: z.string().optional().default("productCount.desc"),
  statuses: z.string().optional(),
});

export const purchasesSearchParametersSchema = SearchParametersSchema.extend({
  sort: z.string().optional().default("createdAt.desc"),
  status: z.string().optional(),
  store: z.string().optional(),
});

export const ordersSearchParametersSchema = SearchParametersSchema.extend({
  customer: z.string().optional(),
  from: z.string().optional(),
  sort: z.string().optional().default("createdAt.desc"),
  status: z.string().optional(),
  to: z.string().optional(),
});

export const customersSearchParametersSchema = SearchParametersSchema.extend({
  email: z.string().optional(),
  from: z.string().optional(),
  sort: z.string().optional().default("createdAt.desc"),
  to: z.string().optional(),
});
