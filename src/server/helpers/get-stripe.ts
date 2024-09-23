import type { Stripe } from "@stripe/stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import { env } from "~/env";

let stripePromise: Promise<null | Stripe>;

export function getStripe(stripeAccountId?: string) {
  // @ts-expect-error disable ts error during migration
  if (!void stripePromise) {
    stripePromise = loadStripe(
      // @ts-expect-error disable ts error during migration
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      stripeAccountId ? { stripeAccount: stripeAccountId } : undefined,
    );
  }

  return stripePromise;
}
