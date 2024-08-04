import type { Stripe } from "@stripe/stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import { env } from "~/env";

let stripePromise: Promise<null | Stripe>;

export function getStripe(stripeAccountId?: string) {
  stripePromise = loadStripe(
    env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    stripeAccountId
      ? {
          stripeAccount: stripeAccountId,
        }
      : undefined,
  );

  return stripePromise;
}
