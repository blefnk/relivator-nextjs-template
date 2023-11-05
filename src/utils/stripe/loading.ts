// Stripe Client SDK
// @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/stripe/client.ts

import { loadStripe, Stripe as StripeProps } from "@stripe/stripe-js";
import { env } from "~/env.mjs";

let stripePromise: Promise<StripeProps | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");
  }

  return stripePromise;
};
