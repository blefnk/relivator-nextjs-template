import type { Metadata } from "next";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Verify the email address to continue with the sign up",
  title: "Verify Email",
};

export default function VerifyEmailPage() {
  const t = useTranslations();

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t("page.verifyEmail")}</CardTitle>
          <CardDescription>
            Verify the email address to complete the account creation
          </CardDescription>
        </CardHeader>
      </Card>
    </Shell>
  );
}
