import { eq } from "drizzle-orm";

import { db } from "~/data/db/client";
import { accounts, users } from "~/data/db/schema";

export const getUserById = async (userId: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .then((res) => res[0] ?? null);
  return user;
};
