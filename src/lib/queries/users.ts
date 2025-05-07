import "server-only";
import { eq } from "drizzle-orm";

import type { User } from "~/db/schema/users/types";

import { db } from "~/db";
import { userTable } from "~/db/schema";

/**
 * Fetches a user from the database by their ID.
 * @param userId - The ID of the user to fetch.
 * @returns The user object or null if not found.
 */
export async function getUserById(userId: string): Promise<null | User> {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, userId),
    });
    return user ?? null; // Return user or null if undefined
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
    return null;
  }
}
