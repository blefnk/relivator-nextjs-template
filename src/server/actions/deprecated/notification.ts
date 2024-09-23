"use server";

import type { UpdateNotificationSchema } from "~/server/validations/deprecated/notification";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import NewsletterWelcomeEmail from "~/components/Emails/NewsletterWelcomeEmail";
import { db } from "~/db";
import { notifications } from "~/db/schema";
import { env } from "~/env";
import { getErrorMessage } from "~/server/helpers/error-message";
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

    const user = await authjs();

    if (input.newsletter && !notification.newsletter) {
      await resend.emails.send({
        from: env.NEXT_PUBLIC_RESEND_EMAIL_FROM || "blefnk@gmail.com",
        react: NewsletterWelcomeEmail({
          firstName: user?.name || undefined,
          fromEmail: env.NEXT_PUBLIC_RESEND_EMAIL_FROM || "blefnk@gmail.com",
          token: input.token,
        }),
        subject: "Welcome to Reliverse Weekly!",
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
