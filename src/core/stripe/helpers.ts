/** @module helpers.ts (currently not used anywhere) */

import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getNextAuthServerSession } from "~/core/auth/authjs";
import { db } from "~/data/db";
import { users, type User } from "~/data/db/schema";
import { userPrivateMetadataSchema } from "~/data/validations/auth";
import { env } from "~/env.mjs";

// todo: Helper function to fetch user private metadata
export async function fetchUserPrivateMetadata(
  userId: string,
): Promise<z.infer<typeof userPrivateMetadataSchema>> {
  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
    const session = await clerkClient.users.getUser(userId);
    if (!session) redirect("/auth");

    return userPrivateMetadataSchema.parse(session.privateMetadata);
  } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
    const session = await getNextAuthServerSession();
    if (!session) redirect("/auth");

    const user: User = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .then((res: User[]) => res[0] ?? null);

    return userPrivateMetadataSchema.parse(user);
  }
  throw new Error("Unsupported NEXT_PUBLIC_AUTH_PROVIDER in env");
}
