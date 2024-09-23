"use server";

import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { db } from "~/db";
import { users } from "~/db/schema";

// TODO: This is a hacky and wrong way to clear the subscription,
// TODO: we need also clear the subscription on the Stripe side.
// rawInput: z.infer<typeof manageSubscriptionSchema>,
export async function manageDowngradeToStarter() {
  // const input = manageSubscriptionSchema.parse(rawInput);
  const session = await authjs();

  if (!session) {
    return redirect("/auth");
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.id || ""))
    .then((res) => res[0] || null);

  if (user) {
    await db
      .update(users)
      .set({
        currentCartId: null,
        mode: "buyer",
        stripeCurrentPeriodEnd: null,
        stripeCustomerId: null,
        stripePriceId: null,
        stripeSubscriptionId: null,
      })
      .where(eq(users.id, user.id));

    return {
      success: "The subscription has been downgraded.",
    };
  }
}
