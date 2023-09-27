import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

import { authOptions } from "~/server/auth";
import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import AuthPageContent from "~/islands/content/auth-pages-content";

export const metadata = seo({
  metadataBase: fullURL(),
  title: "Sign In",
  description: "Sign in to your account",
});

export default async function ProfilesPage() {
  const session = await getServerSession(authOptions());
  const providers = await getProviders();

  if (session?.userId) return redirect("/dashboard/account");
  if (!providers) return null;

  return (
    <AuthPageContent
      accounts={[]}
      isRegPage={false}
      providers={providers}
      user={null}
    />
  );
}
