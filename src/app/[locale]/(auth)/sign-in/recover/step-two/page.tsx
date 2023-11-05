import { type Metadata } from "next";

import { fullURL } from "~/data/meta/builder";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { Shell } from "~/islands/wrappers/shell-variants";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Reset Password",
  description: "Enter your email to reset your password",
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
      </Card>
    </Shell>
  );
}
