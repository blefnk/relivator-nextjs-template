import { type Metadata } from "next";
import { env } from "~/env.mjs";

import { ResetPasswordSecondForm } from "~/forms/reset-password-form-two";
import { Shell } from "~/islands/common/shells/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Reset Password",
  description: "Enter your email to reset your password"
};

export default function ResetPasswordSecondPage() {
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
          <ResetPasswordSecondForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
