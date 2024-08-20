import { DrizzleAdapter } from "@auth/drizzle-adapter";
import consola from "consola";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { User } from "~/db/schema/provider";

import { authProvider } from "~/auth/provider";
import { db } from "~/db";
import { env } from "~/env";

// import Resend from "next-auth/providers/resend";
//
// ?| This file is related to NextAuth.js. Please refer to "src/clerk.ts" if you are using Clerk as the authProvider.
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

const NextSession = async (): Promise<User> => {
  try {
    const { auth } = NextAuth({
      providers: [GitHub, Discord, Google],
    });

    const guest = await GuestSession();
    const session = await auth();

    if (!session?.user) {
      return guest;
    }

    return {
      ...guest,
      id: session.user.id || "",
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || "",
    };
  } catch (error) {
    consola.error("Error fetching user using NextSession:", error);

    return await GuestSession();
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Discord, Google],

  // providers: [GitHub, Discord, Google, Resend],
});

export async function authjs(): Promise<User> {
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
      authProvider === "authjs" ? await NextSession() : await GuestSession();
  } catch (error) {
    consola.error("🐞 Error in fetching NextAuth.js session", error);
    session = await GuestSession();
  }

  // return authProvider === "authjs" ? await NextSession() : await GuestSession();
  return session;
}
