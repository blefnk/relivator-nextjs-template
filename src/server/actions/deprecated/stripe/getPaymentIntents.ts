"use server";

import * as z from "zod";

import { stripe } from "~/core/stripe/connect";
import { getStripeAccountAction } from "~/server/actions/deprecated/stripe/getStripeAccount";

const getPaymentIntentsSchema = z.object({
  created: z.number().optional(),
  customer: z.string().optional(),
  ending_before: z.string().optional(),
  expand: z.array(z.string()).optional(),
  limit: z.number().optional(),
  starting_after: z.string().optional(),
  storeId: z.number(),
});

// Getting payment intents for a store
export async function getPaymentIntentsAction(
  input: z.infer<typeof getPaymentIntentsSchema>,
) {
  try {
    const { isConnected, payment } = await getStripeAccountAction({
      retrieveAccount: false,
      storeId: input.storeId,
    });

    if (!isConnected || !payment) {
      throw new Error("Store not connected to Stripe.");
    }

    if (!payment.stripeAccountId) {
      throw new Error("Stripe account not found.");
    }

    const paymentIntents = await stripe.paymentIntents.list({
      limit: input.limit || 10,
      ...input,
    });

    return {
      hasMore: paymentIntents.has_more,
      paymentIntents: paymentIntents.data.map((item) => ({
        id: item.id,
        amount: item.amount,
        cartId: Number(item.metadata.cartId),
        created: item.created,
      })),
    };
  } catch {
    return {
      hasMore: false,
      paymentIntents: [],
    };
  }
}
