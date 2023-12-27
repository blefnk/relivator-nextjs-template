import { clerkClient, currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

import { authOptions } from "~/core/auth/authjs";
import { db } from "~/data/db";
import { users } from "~/data/db/schema";
import { env } from "~/env.mjs";

/**
 * Wrapper for `getServerSession` or `currentUser` based on the AUTH_PROVIDER env,
 * so that you don't need to import the `authOptions`/`currentUser` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export async function getServerAuthSession() {
  // Use 'authjs' as default if 'NEXT_PUBLIC_AUTH_PROVIDER' is null/undefined
  const authProvider = env.NEXT_PUBLIC_AUTH_PROVIDER || "authjs";

  if (authProvider === "authjs") {
    const session = await getServerSession(authOptions);
    return session?.user;
  } else if (authProvider === "clerk") {
    // const session = await clerkClient.users.getUser(userId);
    // return session;
    return currentUser();
  } else {
    throw new Error(
      "❌ [getServerAuthSession()] Allowed values for 'NEXT_PUBLIC_AUTH_PROVIDER' are 'authjs' and 'clerk'",
    );
  }
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export const getUserById = async (userId: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .then((res) => res[0] ?? null);
  return user;
};

export function getUserEmail(user: User | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  return email;
}

type UserDataFields = {
  email?: string;
  image?: string;
  username?: string;
  initials?: string;
};

type UserDataOptions = { [K in keyof UserDataFields]?: boolean };

export async function getUserData(
  user: User | null | any,
  dataTypes: UserDataOptions = {
    email: true,
    image: true,
    username: true,
    initials: true,
  },
): Promise<UserDataFields> {
  const result: UserDataFields = {};

  const authProvider = env.NEXT_PUBLIC_AUTH_PROVIDER || "authjs";

  if (authProvider === "clerk") {
    if (dataTypes.email) {
      result.email =
        user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
          ?.emailAddress ?? "";
    }
    if (dataTypes.initials) {
      result.initials = `${user?.firstName?.charAt(0) ?? ""} ${
        user?.lastName?.charAt(0) ?? ""
      }`;
    }
    if (dataTypes.username) {
      result.username = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
    }
    if (dataTypes.image) {
      result.image = user?.imageUrl ?? "";
    }
  } else if (authProvider === "authjs") {
    const session = await getServerSession(authOptions);

    if (dataTypes.email) {
      result.email = session?.user?.email ?? "";
    }
    if (dataTypes.username) {
      result.username = `${session?.user?.name ?? ""}`;
    }
    if (dataTypes.initials) {
      result.initials = `${session?.user?.name?.charAt(0) ?? ""}`;
    }
    if (dataTypes.image) {
      result.image = session?.user?.image ?? "";
    }
  } else {
    throw new Error("❌ [users.ts] Invalid auth provider.");
  }

  return result;
}
