import { loadStripe, type Stripe } from "@stripe/stripe-js";

import { env } from "~/env.mjs";

let stripePromise: Promise<Stripe | null>;
export function getStripe(stripeAccountId?: string) {
  if (!void stripePromise) {
    stripePromise = loadStripe(
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
      stripeAccountId ? { stripeAccount: stripeAccountId } : undefined,
    );
  }
  return stripePromise;
}
