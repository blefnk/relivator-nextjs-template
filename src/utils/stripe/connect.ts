/**
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/stripe/index.ts
 */

import { env } from "~/env.mjs";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});
