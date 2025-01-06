import Stripe from "stripe";

import { env } from "~/env.js";

export const stripe = new Stripe(env.STRIPE_API_KEY || "", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
