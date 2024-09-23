import * as z from "zod";

import { cartLineItemSchema } from "~/server/validations/deprecated/cart";

export const manageSubscriptionSchema = z.object({
  isCurrentPlan: z.boolean().optional(),
  isSubscribed: z.boolean().optional(),
  mapPlanId: z.string().optional(),
  stripeCustomerId: z.string().optional().nullable(),
  stripePriceId: z.string().optional(),
  stripeSubscriptionId: z.string().optional().nullable(),
});

export const getStripeAccountSchema = z.object({
  retrieveAccount: z.boolean().default(true).optional(),
  storeId: z.number(),
});

export const createPaymentIntentSchema = z.object({
  items: z.array(cartLineItemSchema),
  storeId: z.number(),
});
