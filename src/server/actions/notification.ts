"use server";

import type { UpdateNotificationSchema } from "~/server/validations/notification";

import { revalidatePath } from "next/cache";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import NewsletterWelcomeEmail from "~/components/Emails/NewsletterWelcomeEmail";
import { db } from "~/db";
import { notifications } from "~/db/schema";
import { env } from "~/env";
import { getErrorMessage } from "~/server/helpers/handle-error";
import { resend } from "~/server/helpers/resend";

export async function updateNotification(input: UpdateNotificationSchema) {
  try {
    const notification = await db
      .select({
        email: notifications.email,
        newsletter: notifications.newsletter,
      })
      .from(notifications)
      .where(eq(notifications.token, input.token))
      .then((res) => res[0]);

    if (!notification) {
      throw new Error("Email not found.");
    }

    const user = await currentUser();

    if (input.newsletter && !notification.newsletter) {
      await resend.emails.send({
        // @ts-expect-error disable ts error during migration
        from: env.EMAIL_FROM_ADDRESS,
        react: NewsletterWelcomeEmail({
          firstName: user?.firstName ?? undefined,
          // @ts-expect-error disable ts error during migration
          fromEmail: env.EMAIL_FROM_ADDRESS,
          token: input.token,
        }),
        subject: "Welcome to relivator",
        to: notification.email,
      });
    }

    await db
      .update(notifications)
      .set({
        ...input,
        userId: user?.id,
      })
      .where(eq(notifications.token, input.token));

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}
