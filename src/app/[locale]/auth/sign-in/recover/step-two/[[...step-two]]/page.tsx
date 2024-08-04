import type { Metadata } from "next";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/browser/reliverse/ui/CardUI";

import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Enter the email to reset the password",
  title: "Reset Password",
};

export default function ResetPasswordSecondPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter the email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
      </Card>
    </Shell>
  );
}
