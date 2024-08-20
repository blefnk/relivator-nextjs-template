import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { db } from "~/db";
import { users } from "~/db/schema/provider";

type ChangeUserPrivilegesProps = {
  role: "admin" | "user";
  userId: string;
};

export async function changeUserPrivileges({
  role,
  userId,
}: ChangeUserPrivilegesProps) {
  // const session = await authjs();
  const session = await authjs();

  if (!session) {
    return redirect("/auth");
  }

  try {
    const admin = await db.query.users.findFirst({
      columns: {
        role: true,
      },
      where: eq(users.id, session.id),
    });

    if (!admin || admin.role !== "admin") {
      return {
        res: "You need to have 'admin' role in 'users' table to change privileges",
      };
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return {
        res: "User not found",
      };
    }

    const success = await db
      .update(users)
      .set({
        role,
      })
      .where(eq(users.id, userId));

    if (success) {
      return {
        res: `User role was changed to '${role}'`,
      };
    }

    return {
      res: "Something wrong when switching user role...",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        res: `Error when switching user role: ${error.message}`,
      };
    }

    return {
      res: "An unknown error occurred",
    };
  }
}
