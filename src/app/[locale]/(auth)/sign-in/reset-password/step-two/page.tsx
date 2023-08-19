import { type Metadata } from "next";

import { env } from "~/env.mjs";

// import { ResetPasswordStep2Form } from "~/islands/account/reset/password-step-two"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";
import { Shell } from "~/islands/wrappers/shell";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL_AUTHJS),
  title: "Reset Password",
  description: "Enter your email to reset your password"
};

export default function ResetPasswordStep2Page() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>{/* <ResetPasswordStep2Form /> */}</CardContent>
      </Card>
    </Shell>
  );
}
