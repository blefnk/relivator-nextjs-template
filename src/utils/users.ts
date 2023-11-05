import { clerkClient, currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { authOptions } from "~/auth";
import { env } from "~/env.mjs";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

import { db } from "~/data/db";
import { users } from "~/data/db/schema";

/**
 * Wrapper for `getServerSession` or `currentUser` based on the AUTH_PROVIDER env,
 * so that you don't need to import the `authOptions`/`currentUser` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export async function getServerAuthSession() {
  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
    const session = await getServerSession(authOptions);
    return session?.user;
  } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
    // const session = await clerkClient.users.getUser(userId);
    // return session;
    return currentUser();
  } else {
    throw new Error(
      "❌ [getServerAuthSession()] Invalid or unspecified 'NEXT_PUBLIC_AUTH_PROVIDER'",
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

  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
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
  } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
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
