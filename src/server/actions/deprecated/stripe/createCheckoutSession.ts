"use server";

import type { createPaymentIntentSchema } from "~/core/stripe/zod";
import type { CheckoutItem } from "~/types/store";
import type { z } from "zod";

import { eq } from "drizzle-orm";
import superjson from "superjson";

import { stripe } from "~/core/stripe/connect";
import { db } from "~/db";
import { carts } from "~/db/schema";
import { env } from "~/env";
import { getStripeAccountAction } from "~/server/actions/deprecated/stripe/getStripeAccount";
import { getCartId } from "~/server/helpers/cart";

const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
};

// Creating checkout session for a store
export async function createCheckoutSession(
  input: z.infer<typeof createPaymentIntentSchema>,
) {
  try {
    const { isConnected, payment } = await getStripeAccountAction(input);

    if (!isConnected || !payment) {
      return {
        error: "Store not connected to Stripe.",
      };
    }

    if (!payment.stripeAccountId) {
      return {
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

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create(
      {
        cancel_url: absoluteUrl("/checkout"),
        line_items: input.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Number(item.price) * 100,
          },
          quantity: item.quantity,
        })),
        metadata: {
          cartId: Number(cartId) || null,
          items: superjson.stringify(checkoutItems),
        },
        mode: "payment",
        payment_method_types: ["card"],
        success_url: absoluteUrl(
          `/checkout/success/?store_id=${input.storeId}`,
        ),
      },
      {
        stripeAccount: payment.stripeAccountId,
      },
    );

    // Update the cart with the checkout session id
    await db
      .update(carts)
      .set({
        paymentIntentId: String(checkoutSession.payment_intent),
      }) // @ts-expect-error TODO: Fix id type
      .where(eq(carts.id, cartId));

    return {
      id: checkoutSession.id,
      url: checkoutSession.url || "/checkout",
    };
  } catch {
    return {
      error: "An error occurred while creating the checkout session.",
    };
  }
}
