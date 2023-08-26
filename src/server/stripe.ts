import Stripe from "stripe";

import { env } from "~/data/env";

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2023-08-16",
  typescript: true
});
