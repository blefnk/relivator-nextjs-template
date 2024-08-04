import type { Stripe } from "@stripe/stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import { env } from "~/env";

let stripePromise: Promise<null | Stripe>;

// Stripe Client SDK
// @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/stripe/client.ts
export const getStripe = () => {
  if (stripePromise === undefined) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
  }

  return stripePromise;
};
