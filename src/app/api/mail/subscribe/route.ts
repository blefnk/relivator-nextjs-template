import { NextResponse } from "next/server";

import { joinNewsletterSchema } from "@/actions/reliverse/validations/notification";
import { config } from "@reliverse/core";
import consola from "consola";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { z } from "zod";

import { authjs } from "~/auth/authjs";
import NewsletterWelcomeEmail from "~/components/Emails/NewsletterWelcomeEmail";
import { db } from "~/db";
import { notifications } from "~/db/schema/provider";
import { env } from "~/env";

const resendApiKey = env.NEXT_PUBLIC_RESEND_API_KEY;

export async function POST(req: Request) {
  if (!resendApiKey) {
    return NextResponse.json(
      {
        error:
          "NEXT_PUBLIC_RESEND_API_KEY is not set in the .env file or in the Vercel dashboard.",
      },
      {
        status: 500,
      },
    );
  }

  const resend = new Resend(resendApiKey);

  const input = joinNewsletterSchema.parse(await req.json());

  try {
    const notification = await db
      .select({
        id: notifications.id,
        email: notifications.email,
        newsletter: notifications.newsletter,
        token: notifications.token,
      })
      .from(notifications)
      .where(eq(notifications.email, input.email))
      .execute()
      .then((res) => res[0]);

    if (notification?.newsletter) {
      return NextResponse.json(
        { message: "You are already subscribed to the newsletter." },
        {
          status: 409,
        },
      );
    }

    const user = await authjs();

    await Promise.all([
      resend.emails.send({
        from: env.NEXT_PUBLIC_RESEND_EMAIL_FROM || "onboarding@resend.dev",
        react: NewsletterWelcomeEmail({
          firstName: user?.name || "there",
          fromEmail:
            env.NEXT_PUBLIC_RESEND_EMAIL_FROM || "onboarding@resend.dev",
          token: notification?.token || input.token,
        }),
        subject: input.subject || `Welcome to ${config.engine.name} Weekly!`,
        to: input.email,
      }),
      db
        .insert(notifications)
        .values({
          email: input.email,
          newsletter: true,
          token: input.token,
        })
        .onConflictDoUpdate({
          set: {
            newsletter: true,
          },
          target: [notifications.email],
        }),
    ]);

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      {
        status: 200,
      },
    );
  } catch (error) {
    consola.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.message },
        {
          status: 422,
        },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong 🥲" },
      {
        status: 500,
      },
    );
  }
}
