"use client";

import type { CartLineItem } from "~/types/store";

import { useMemo, useTransition } from "react";

import consola from "consola";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { Button } from "~/components/ui/button";
import { getStripe } from "~/core/stripe/getting";
import { createCheckoutSession } from "~/server/actions/deprecated/stripe/createCheckoutSession";

function toastError(getErrorMessage: string) {
  consola.error(getErrorMessage);

  return null;
}

type CheckoutButtonProps = {
  cartLineItems: CartLineItem[];
  storeId: string;
};

export function CheckoutButton({
  cartLineItems,
  storeId,
}: CheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const stripePromise = useMemo(
    () => getStripe(cartLineItems[0]?.storeStripeAccountId || ""),
    [cartLineItems],
  );

  return (
    <Button
      id={`store-${storeId}-checkout-button`}
      aria-label="Checkout with the cart items"
      disabled={isPending}
      size="sm"
      onClick={() => {
        startTransition(async () => {
          try {
            const stripe = await stripePromise;

            if (!stripe) {
              toastError("Stripe is not available. Please try again later.");

              return;
            }

            const sessionResponse = await createCheckoutSession({
              items: cartLineItems,
              // @ts-expect-error TODO: fix id type
              storeId,
            });

            if (sessionResponse.error) {
              toastError(sessionResponse.error);

              return;
            }

            if (!sessionResponse.id) {
              toastError(
                "Session ID is not available. Please try again later.",
              );

              return;
            }

            const { error } = await stripe.redirectToCheckout({
              sessionId: sessionResponse.id,
            });

            if (error) {
              toastError(
                "Something went wrong with the checkout. Please try again later.",
              );
            }
          } catch {
            toastError(
              "Something went wrong with the checkout. Please try again later.",
            );
          }
        });
      }}
    >
      {isPending && (
        <SpinnerSVG className="mr-2 size-4 animate-spin" aria-hidden="true" />
      )}
      Checkout
    </Button>
  );
}
