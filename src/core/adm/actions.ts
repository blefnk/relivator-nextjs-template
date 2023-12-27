"use server";

import { eq } from "drizzle-orm";

import { db } from "~/data/db";
import type { User } from "~/data/db/schema";
import { users } from "~/data/db/schema";
import { redirect } from "~/navigation";
import { getServerAuthSession } from "~/utils/auth/users";

interface changeUserPrivilegiesProps {
  role: "user" | "admin";
  userId: string;
}

export async function changeUserPrivilegies({
  role,
  userId,
}: changeUserPrivilegiesProps) {
  const session = await getServerAuthSession();
  if (!session) return redirect("/auth");

  try {
    const admin: User = await db.query.users.findFirst({
      columns: { role: true },
      where: eq(users.id, session.id),
    });
    if (!admin || admin.role !== "admin") {
      return {
        result:
          "You need to have 'admin' role in 'users' table to change user privileges",
      };
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    if (!user) return { result: "User not found" };

    const success: boolean = await db
      .update(users)
      .set({ role } as User)
      .where(eq(users.id, userId));

    if (success) return { result: `User role was changed to '${role}'` };
    else return { result: "Something wrong when switching user role..." };
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error in changeUserPrivilegies:", error.message);
      return { result: `Error when switching user role: ${error.message}` };
    } else {
      console.error("❌ Unknown error in changeUserPrivilegies");
      return { result: "An unknown error occurred" };
    }
  }
}
