import { currentUser } from "@clerk/nextjs";
import { env } from "~/env.mjs";
import { redirect } from "~/navigation";
import { getProviders } from "next-auth/react";

import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import AuthPagesContent from "~/islands/content/auth-pages-content";
import { getCurrentUser } from "~/utils/users";

export const metadata = seo({
  metadataBase: fullURL(),
  title: "Sign In",
  description: "Sign into your account",
});

export default async function SignInPage() {
  let user: any;
  let NextAuthProviders: any;

  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
    user = await currentUser();
  } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
    user = await getCurrentUser();
    NextAuthProviders = await getProviders();
    if (!NextAuthProviders) return null;
    if (user?.id) return redirect("/dashboard/stores");
  } else {
    throw new Error(
      "❌ [SiteHeader] `env.NEXT_PUBLIC_AUTH_PROVIDER` is not defined",
    );
  }

  return (
    <AuthPagesContent
      user={user}
      isRegPage={false}
      providers={NextAuthProviders}
    />
  );
}
