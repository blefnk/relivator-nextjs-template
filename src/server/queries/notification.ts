import "server-only";

import { unstable_noStore as noStore } from "next/cache";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { notifications } from "~/db/schema";

export async function getNotification(input: {
  email?: string;
  token?: string;
}) {
  noStore();

  try {
    const notification = await db
      .select({
        email: notifications.email,
        marketing: notifications.marketing,
        newsletter: notifications.newsletter,
        token: notifications.token,
      })
      .from(notifications)
      .where(
        input.token
          ? eq(notifications.token, input.token)
          : input.email
            ? eq(notifications.email, input.email)
            : input.token && input.email
              ? and(
                  eq(notifications.token, input.token),
                  eq(notifications.email, input.email),
                )
              : undefined,
      )
      .then((res) => res[0]);

    return notification;
  } catch (error) {
    return null;
  }
}
