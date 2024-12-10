import { loadStripe, type Stripe } from "@stripe/stripe-js";

import { env } from "~/env.js";

let stripePromise: Promise<Stripe | null> | null = null;
export function getStripe(stripeAccountId?: string) {
  if (!stripePromise) {
    stripePromise = loadStripe(
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
      stripeAccountId ? { stripeAccount: stripeAccountId } : undefined,
    );
  }
  return stripePromise;
}
