"use server";

import * as z from "zod";

import { stripe } from "~/core/stripe/connect";
import { getStripeAccountAction } from "~/server/actions/deprecated/stripe/getStripeAccount";
import { getCartId } from "~/server/helpers/cart";

const getPaymentIntentSchema = z.object({
  deliveryPostalCode: z.string().optional().nullable(),
  paymentIntentId: z.string(),
  storeId: z.number(),
});

// Getting a payment intent for a store
export async function getPaymentIntentAction(
  input: z.infer<typeof getPaymentIntentSchema>,
) {
  try {
    const cartId = await getCartId();

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

    const paymentIntent = await stripe.paymentIntents.retrieve(
      input.paymentIntentId,
      {
        stripeAccount: payment.stripeAccountId,
      },
    );

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment intent not succeeded.");
    }

    if (
      paymentIntent.metadata.cartId !== cartId

      // && paymentIntent.shipping?.address?.postal_code?.split(" ").join("") !== input.deliveryPostalCode
    ) {
      // throw new Error("CartId or delivery postal code does not match.");
      throw new Error(
        "App's user's CartId does not match with the corresponding Stripe's customer CartId.",
      );
    }

    return {
      isVerified: true,
      paymentIntent,
    };
  } catch {
    return {
      isVerified: false,
      paymentIntent: null,
    };
  }
}
