import * as z from "zod";

import { cartLineItemSchema } from "~/server/validations/cart";

export const managePlanSchema = z.object({
  isCurrentPlan: z.boolean().optional(),
  isSubscribed: z.boolean().optional(),
  stripeCustomerId: z.string().optional().nullable(),
  stripePriceId: z.string(),
  stripeSubscriptionId: z.string().optional().nullable(),
});

export const getStripeAccountSchema = z.object({
  retrieveAccount: z.boolean().default(true).optional(),
  storeId: z.string(),
});

export const createPaymentIntentSchema = z.object({
  items: z.array(cartLineItemSchema),
  storeId: z.string(),
});

export const getPaymentIntentsSchema = z.object({
  created: z.number().optional(),
  customer: z.string().optional(),
  ending_before: z.string().optional(),
  expand: z.array(z.string()).optional(),
  limit: z.number().optional(),
  starting_after: z.string().optional(),
  storeId: z.string(),
});

export const getPaymentIntentSchema = z.object({
  deliveryPostalCode: z.string().optional().nullable(),
  paymentIntentId: z.string(),
  storeId: z.string(),
});
