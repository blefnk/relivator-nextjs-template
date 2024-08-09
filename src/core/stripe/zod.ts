import { cartLineItemSchema } from "@/actions/reliverse/validations/cart";
import * as z from "zod";

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

export const getPaymentIntentsSchema = z.object({
  created: z.number().optional(),
  customer: z.string().optional(),
  ending_before: z.string().optional(),
  expand: z.array(z.string()).optional(),
  limit: z.number().optional(),
  starting_after: z.string().optional(),
  storeId: z.number(),
});

export const getPaymentIntentSchema = z.object({
  deliveryPostalCode: z.string().optional().nullable(),
  paymentIntentId: z.string(),
  storeId: z.number(),
});
