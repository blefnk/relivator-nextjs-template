import { eq } from "drizzle-orm";
import type { SendVerificationRequestParams } from "next-auth/providers/email";

import { emailClient } from "~/server/emails";
import { db } from "~/data/db/client";
import { users } from "~/data/db/schema";
import SignInEmail from "~/data/mail/auth-user";

export async function sendVerificationRequest({
  identifier,
  url,
  provider
}: SendVerificationRequestParams) {
  const existingUsers = await db
    .select({
      emailVerified: users.emailVerified
    })
    .from(users)
    .where(eq(users.email, identifier))
    .limit(1);

  const user = existingUsers[0];

  await emailClient().sendEmail({
    from: provider.from,
    to: identifier,
    subject: user?.emailVerified
      ? "Sign in to Relivator"
      : "Welcome to Relivator!",
    react: (
      <SignInEmail
        emailAddress={identifier}
        existingUser={Boolean(user?.emailVerified)}
        url={url}
      />
    )
  });
}
