import Stripe from "stripe";

import { env } from "~/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
  typescript: true,
});
