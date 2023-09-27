import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { type ErrorResponse } from "resend";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { resend } from "~/server/resend";
import { db } from "~/data/db/client";
import { emailPreferences } from "~/data/db/schema";
import { env } from "~/data/env/env.mjs";
import NewsletterWelcomeEmail from "~/data/mail/newsletter";
import { subscribeToNewsletterSchema } from "~/data/validations/email";

export async function POST(req: Request) {
  const input = subscribeToNewsletterSchema.parse(await req.json());

  try {
    const emailPreference = await db.query.emailPreferences.findFirst({
      where: eq(emailPreferences.email, input.email),
    });

    if (emailPreference?.newsletter) {
      return new Response("You are already subscribed to the newsletter.", {
        status: 409,
      });
    }

    const session = await getServerSession(authOptions());

    const subject = input.subject ?? "Welcome to our newsletter";

    // If email preference exists, update it and send the email
    if (session && emailPreference) {
      await db
        .update(emailPreferences)
        .set({
          newsletter: true,
        })
        .where(eq(emailPreferences.email, input.email));

      await resend.emails.send({
        from: env.EMAIL_FROM,
        to: input.email,
        subject,
        react: NewsletterWelcomeEmail({
          firstName: session.user?.name ?? undefined,
          fromEmail: env.EMAIL_FROM,
          token: emailPreference.token,
        }),
      });
    } else {
      // If email preference does not exist
      // create it and then send the email
      if (session)
        await resend.emails.send({
          from: env.EMAIL_FROM,
          to: input.email,
          subject,
          react: NewsletterWelcomeEmail({
            firstName: session.user?.name ?? undefined,
            fromEmail: env.EMAIL_FROM,
            token: input.token,
          }),
        });

      if (session)
        await db.insert(emailPreferences).values({
          email: input.email,
          token: input.token,
          userId: session.user?.name ?? undefined,
          newsletter: true,
        });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    const resendError = error as ErrorResponse;

    if (resendError?.error?.message) {
      return new Response(resendError.error.message, { status: 429 });
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
