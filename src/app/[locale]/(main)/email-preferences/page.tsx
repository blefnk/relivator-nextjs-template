import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "~/env.mjs";
import { eq } from "drizzle-orm";

import { db } from "~/data/db/drizzle";
import { emailPreferences } from "~/data/db/schema";
import { UpdateEmailPreferencesForm } from "~/forms/update-email-preferences-form";
import { Shell } from "~/islands/common/shells/shell";
import { PageHeader } from "~/islands/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Email Preferences",
  description: "Manage your email preferences"
};

interface EmailPreferencesPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function EmailPreferencesPage({
  searchParams
}: EmailPreferencesPageProps) {
  const token =
    typeof searchParams.token === "string" ? searchParams.token : "";

  const emailPreference = await db.query.emailPreferences.findFirst({
    where: eq(emailPreferences.token, token)
  });

  if (!emailPreference) {
    notFound();
  }

  return (
    <Shell variant="centered">
      <PageHeader title="Email Preferences" className="text-center" />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateEmailPreferencesForm emailPreference={emailPreference} />
        </CardContent>
      </Card>
    </Shell>
  );
}
