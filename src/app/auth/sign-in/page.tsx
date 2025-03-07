import { AuthLayout } from "~/ui/components/layouts/auth-layout";
import { SignInPageClient } from "./client";

export default function SignInPage() {
  return (
    <AuthLayout
      heading="Sign In"
      subheading="Enter your credentials to access your account"
      backLink={{
        href: "/auth/sign-up",
        label: "Don't have an account? Sign up",
      }}
    >
      <SignInPageClient />
    </AuthLayout>
  );
}
