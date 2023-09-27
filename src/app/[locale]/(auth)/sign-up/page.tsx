import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

import { authOptions } from "~/server/auth";
import { seo } from "~/data/meta";
import AuthPageContent from "~/islands/content/auth-pages-content";

export const metadata = seo({
  title: "Sign Up",
  description: "Register to have full website access",
});

export default async function ProfilesPage() {
  const session = await getServerSession(authOptions());
  const providers = await getProviders();

  if (session?.userId) return redirect("/dashboard/account");
  if (!providers) return null;

  return (
    <AuthPageContent
      accounts={[]}
      isRegPage={true}
      providers={providers}
      user={null}
    />
  );
}
