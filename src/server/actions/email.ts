"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { type z } from "zod";

import { authOptions } from "~/server/auth";
import { resend } from "~/server/resend";
import { db } from "~/data/db/client";
import { emailPreferences } from "~/data/db/schema";
import { env } from "~/data/env/env.mjs";
import NewsletterWelcomeEmail from "~/data/mail/newsletter";
import { type updateEmailPreferencesSchema } from "~/data/validations/email";

// Email can not be sent through a server action in production, because it is returning an email component maybe?
// So we are using the route handler /api/mail/subscribe instead

export async function updateEmailPreferencesAction(
  input: z.infer<typeof updateEmailPreferencesSchema>,
) {
  const emailPreference = await db.query.emailPreferences.findFirst({
    where: eq(emailPreferences.token, input.token),
  });

  if (!emailPreference) {
    throw new Error("Email not found.");
  }

  const session = await getServerSession(authOptions());

  if (input.newsletter && !emailPreference.newsletter) {
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: emailPreference.email,
      subject: "Welcome to Relivator!",
      react: NewsletterWelcomeEmail({
        firstName: session?.user?.name ?? undefined,
        fromEmail: env.EMAIL_FROM,
        token: input.token,
      }),
    });
  }

  await db
    .update(emailPreferences)
    .set({
      ...input,
      userId: session?.user?.email ?? undefined,
    })
    .where(eq(emailPreferences.token, input.token));

  revalidatePath("/");
}
