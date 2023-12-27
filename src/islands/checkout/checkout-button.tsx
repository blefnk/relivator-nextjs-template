"use client";

import * as React from "react";
import type { CartLineItem } from "~/types";
import { catchError, toastError } from "~/utils";

import { createCheckoutSessionAction } from "~/core/stripe/actions";
import { getStripe } from "~/core/stripe/getting";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";

interface CheckoutButtonProps {
  storeId: number;
  cartLineItems: CartLineItem[];
}

export function CheckoutButton({
  storeId,
  cartLineItems,
}: CheckoutButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const stripePromise = React.useMemo(
    () => getStripe(cartLineItems[0]?.storeStripeAccountId ?? ""),
    [cartLineItems],
  );

  return (
    <Button
      id={`store-${storeId}-checkout-button`}
      aria-label="Checkout with your cart items"
      size="sm"
      onClick={() => {
        startTransition(async () => {
          try {
            const stripe = await stripePromise;
            if (!stripe) {
              toastError("Stripe is not available.");
              return;
            }

            const sessionResponse = await createCheckoutSessionAction({
              items: cartLineItems,
              storeId,
            });

            if (sessionResponse.error) {
              toastError(sessionResponse.error);
              return;
            }

            if (!sessionResponse.id) {
              toastError("Session ID is undefined.");
              return;
            }

            const { error } = await stripe.redirectToCheckout({
              sessionId: sessionResponse.id,
            });

            if (error) {
              toastError(
                error.message ||
                  "An error occurred during the checkout process.",
              );
            }
          } catch (err) {
            if (err instanceof Error) toastError(err.message);
            else toastError("An unexpected error occurred.");
          }
        });
      }}
      disabled={isPending}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Checkout
    </Button>
  );
}
