import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { getProviders } from "next-auth/react";
import { getTranslations } from "next-intl/server";

import { AuthPagesContent } from "~/core/auth/shared/islands/auth-pages-content";
// import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import { env } from "~/env.mjs";
import { redirect } from "~/navigation";
import { getCurrentUser } from "~/utils/auth/users";

// export const metadata = seo({
export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Sign In",
  description: "Sign into your account",
};

export default async function SignInPage() {
  const t = await getTranslations();

  let NextAuthProviders: any;
  let user: any;

  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
    user = await currentUser();
    if (user?.id) return redirect("/auth");
  } else {
    user = await getCurrentUser();
    NextAuthProviders = await getProviders();
    if (!NextAuthProviders) {
      console.error(
        "❌ Specify at least one NextAuth.js provider or switch to Clerk (refer to .env.example)",
      );
      return redirect("/");
    }
    if (user?.id) return redirect("/auth");
  }

  return (
    <AuthPagesContent
      user={user}
      isRegPage={false}
      providers={NextAuthProviders}
      // INTERNATIONALIZATION
      tSignin={t("auth.error.default")}
      tOAuthSignin={t("auth.error.default")}
      tOAuthCallback={t("auth.error.default")}
      tOAuthCreateAccount={t("auth.error.email")}
      tEmailCreateAccount={t("auth.error.default")}
      tCallback={t("auth.error.default")}
      tOAuthAccountNotLinked={t("auth.error.oauthNotLinked")}
      tDefault={t("auth.error.unknown")}
      tUnknownError={t("auth.error.unknown-error")}
      tPrivacy={t("auth.legal-privacy")}
      tTerms={t("auth.legal-terms")}
      tAnd={t("auth.legal-and")}
      tSignUpLink={t("RegisterForm.title")}
      tSignInLink={t("LoginForm.title")}
      tAuthLegal={t("auth.legal")}
      tSignUpHere={t("LoginForm.signup")}
      tNoAccount={t("LoginForm.no-account")}
      tSignInHere={t("RegisterForm.signin")}
      tHaveAccount={t("RegisterForm.have-account")}
      tPleaseWait={t("auth-provider.please-wait")}
    />
  );
}
