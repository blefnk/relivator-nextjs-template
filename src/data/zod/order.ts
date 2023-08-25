import * as z from "zod";

import { checkoutItemSchema } from "~/data/zod/cart";

export const getOrderedProductsSchema = z.object({
  checkoutItems: z.array(checkoutItemSchema),
  storeId: z.number()
});
