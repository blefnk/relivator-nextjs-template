"use server";

import type { createPaymentIntentSchema } from "~/core/stripe/zod";
import type { CheckoutItem } from "~/types/store";
import type { z } from "zod";

import { eq } from "drizzle-orm";
import superjson from "superjson";

import { stripe } from "~/core/stripe/connect";
import { db } from "~/db";
import { carts } from "~/db/schema";
import { getStripeAccountAction } from "~/server/actions/deprecated/stripe/getStripeAccount";
import { getCartId } from "~/server/helpers/cart";
import { calculateOrderAmount } from "~/utils/misc";

// Creating a payment intent for a store
export async function createPaymentIntent(
  input: z.infer<typeof createPaymentIntentSchema>,
): Promise<{
  clientSecret: null | string;
  error?: string;
}> {
  try {
    const { isConnected, payment } = await getStripeAccountAction(input);

    if (!isConnected || !payment) {
      return {
        clientSecret: null,
        error: "Store not connected to Stripe.",
      };
    }

    if (!payment.stripeAccountId) {
      return {
        clientSecret: null,
        error: "Stripe account not found.",
      };
    }

    const cartId = await getCartId();

    const checkoutItems: CheckoutItem[] = input.items.map((item) => ({
      price: Number(item.price),
      productId: item.id,
      quantity: item.quantity,
      storeId: item.storeId,
      subcategory: item.subcategory,
    }));

    const metadata = {
      cartId: Number(cartId) || null,
      items: superjson.stringify(checkoutItems),
    };

    const { fee, total } = calculateOrderAmount(input.items);

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: total,
        application_fee_amount: fee,
        automatic_payment_methods: {
          enabled: true,
        },
        currency: "usd",
        metadata,
      },
      {
        stripeAccount: payment.stripeAccountId,
      },
    );

    await db
      .update(carts)
      .set({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }) // @ts-expect-error TODO: Fix id type
      .where(eq(carts.id, cartId));

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch {
    return {
      clientSecret: null,
      error: "An error occurred while creating the payment intent.",
    };
  }
}
