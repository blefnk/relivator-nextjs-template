import * as z from "zod";

export const getOrderLineItemsSchema = z.object({
  items: z.string().optional(),
  storeId: z.string(),
});

export const verifyOrderSchema = z.object({
  deliveryPostalCode: z.string().min(1, {
    message: "Please enter a valid postal code",
  }),
});
