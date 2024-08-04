import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authjs } from "~/auth/authjs";

type UpdateSubscriptionProps = {
  currentSubscription: "enterprise" | "none" | "premium" | "starter";
  subscription: "enterprise" | "none" | "premium" | "starter";
  userId: string;
};

export async function updateSubscription({
  currentSubscription,
  subscription,
}: UpdateSubscriptionProps) {
  const session = await authjs();

  if (!session) {
    return redirect("/auth");
  }

  try {
    // const user = await db.query.users.findFirst({
    // where: eq(users.id, userId),
    // });
    // if (!user) {
    // return {
    // res: "User not found",
    // };
    // }
    // const success = await db
    // .update(users)
    // .set({
    // subscription: currentSubscription === subscription ? "none" : subscription,
    // })
    // .where(eq(users.id, userId));
    revalidatePath("/user");

    return {
      res:
        currentSubscription === subscription
          ? "User subscription was canceled"
          : `User subscription was changed to '${subscription}'`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        res: `Error when switching user subscription: ${error.message}`,
      };
    }

    return {
      res: "An unknown error occurred",
    };
  }
}
