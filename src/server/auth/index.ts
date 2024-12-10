import { currentUser } from "@clerk/nextjs/server";
import consola from "consola";

import type { User } from "~/server/db/schema/users";

import { env } from "~/env";

const authProvider = Boolean(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const GuestSession = async (): Promise<User> => ({
  id: "guestId",
  name: "guestName",
  age: 18,
  email: "guest@email.com",
  currentStoreId: "",
  // createdAt: new Date("2024-07-10T00:00:00.000Z"),
  // currentCartId: "guestCurrentCartId",
  // emailVerified: new Date("2024-07-10T00:00:00.000Z"),
  // hashedPassword: "guestHashedPassword",
  // image: "https://bleverse.com/logo.png",
  // mode: "buyer",
  // role: "user",
  // status: "guest",
  // stripeCurrentPeriodEnd: "guestStripeCurrentPeriodEnd",
  // stripeCustomerId: "guestStripeCustomerId",
  // stripePriceId: "guestStripePriceId",
  // stripeSubscriptionId: "guestStripeSubscriptionId",
  // updatedAt: new Date("2024-07-10T00:00:00.000Z"),
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
    email: user.primaryEmailAddress?.emailAddress || guest.email,
    currentStoreId: "",
    // createdAt: new Date(user.createdAt) || new Date("2024-07-10T00:00:00.000Z"),
    // currentCartId: "guestCurrentCartId",
    // emailVerified: new Date("2024-07-10T00:00:00.000Z"),
    // hashedPassword: "guestHashedPassword",
    // image: user.imageUrl || guest.image,
    // mode: "buyer",
    // role: "user",
    // status: "guest",
    // stripeCurrentPeriodEnd: "guestStripeCurrentPeriodEnd",
    // stripeCustomerId: "guestStripeCustomerId",
    // stripePriceId: "guestStripePriceId",
    // stripeSubscriptionId: "guestStripeSubscriptionId",
    // updatedAt: new Date(user.updatedAt) || new Date("2024-07-10T00:00:00.000Z"),
  } satisfies User;
};

export async function clerk(): Promise<User> {
  if (!env.DATABASE_URL) {
    return await GuestSession();
  }

  if (!authProvider) {
    return await GuestSession();
  }

  let session;

  try {
    session = authProvider ? await ClerkSession() : await GuestSession();
  } catch (error) {
    consola.error("🐞 Error in fetching Clerk session", error);
    session = await GuestSession();
  }

  return session;
}
