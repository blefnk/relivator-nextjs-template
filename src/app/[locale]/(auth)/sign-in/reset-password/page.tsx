import { type Metadata } from "next";

import { env } from "~/data/env";
import { fullURL } from "~/data/meta/builder";
import { ResetPasswordForm } from "~/forms/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";
import { Shell } from "~/islands/shells/shell";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Reset Password",
  description: "Enter your email to reset your password"
};

export default function ResetPasswordPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
