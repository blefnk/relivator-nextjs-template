import * as z from "zod";

import { checkoutItemSchema } from "./cart";

export const getOrderedProductsSchema = z.object({
  checkoutItems: z.array(checkoutItemSchema),
});

export const getCheckoutSessionProductsSchema = z.object({
  storeId: z.number().optional(),
});

export const getOrderLineItemsSchema = z.object({
  items: z.string().optional(),
  storeId: z.number(),
});

export const verifyOrderSchema = z.object({
  deliveryPostalCode: z.string().min(1, {
    message: "Please enter a valid postal code",
  }),
});
