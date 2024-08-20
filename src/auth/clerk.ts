import { currentUser } from "@clerk/nextjs/server";
import consola from "consola";

import type { User } from "~/db/schema/provider";

import { authProvider } from "~/auth/provider";
import { env } from "~/env";

// ?| This file is related to Clerk. Please refer to "src/auth.ts" if you are using NextAuth.js as the authProvider.
//
const GuestSession = async (): Promise<User> => ({
  id: "guestId",
  name: "guestName",
  age: 18,
  createdAt: new Date("2024-07-10T00:00:00.000Z"),
  currentCartId: "guestCurrentCartId",
  email: "guest@email.com",
  emailVerified: new Date("2024-07-10T00:00:00.000Z"),
  hashedPassword: "guestHashedPassword",
  image: "https://relivator.reliverse.org/logo.png",
  mode: "buyer",
  role: "user",
  status: "guest",
  stripeCurrentPeriodEnd: "guestStripeCurrentPeriodEnd",
  stripeCustomerId: "guestStripeCustomerId",
  stripePriceId: "guestStripePriceId",
  stripeSubscriptionId: "guestStripeSubscriptionId",
  updatedAt: new Date("2024-07-10T00:00:00.000Z"),
});

const ClerkSession = async (): Promise<User> => {
  const guest = await GuestSession();
  const user = await currentUser();

  if (!user) {
    return guest;
  }

  return {
    id: user.id || guest.id,
    name: user.fullName || "Unknown",
    age: 18,
    createdAt: new Date(user.createdAt) || new Date("2024-07-10T00:00:00.000Z"),
    currentCartId: "guestCurrentCartId",
    email: user.primaryEmailAddress?.emailAddress || guest.email,
    emailVerified: new Date("2024-07-10T00:00:00.000Z"),
    hashedPassword: "guestHashedPassword",
    image: user.imageUrl || guest.image,
    mode: "buyer",
    role: "user",
    status: "guest",
    stripeCurrentPeriodEnd: "guestStripeCurrentPeriodEnd",
    stripeCustomerId: "guestStripeCustomerId",
    stripePriceId: "guestStripePriceId",
    stripeSubscriptionId: "guestStripeSubscriptionId",
    updatedAt: new Date(user.updatedAt) || new Date("2024-07-10T00:00:00.000Z"),
  };
};

export async function clerk(): Promise<User> {
  if (!env.DATABASE_URL) {
    return await GuestSession();
  }

  if (!authProvider) {
    consola.warn(
      // eslint-disable-next-line @stylistic/max-len
      "Please set or correct authProvider in the `reliverse.config.ts` file to enable user authentication with real data. The app is currently using guest data.",
    );

    return await GuestSession();
  }

  let session;

  try {
    session =
      authProvider === "clerk" ? await ClerkSession() : await GuestSession();
  } catch (error) {
    consola.error("🐞 Error in fetching Clerk session", error);
    session = await GuestSession();
  }

  return session;
}
