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
  description: "Enter the email to reset the password",
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  const t = useTranslations();

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t("page.resetPassword")}</CardTitle>
          <CardDescription>
            Enter the email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
      </Card>
    </Shell>
  );
}
