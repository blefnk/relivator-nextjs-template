import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { authProvider } from "~/../reliverse.config";
import { getTranslations } from "next-intl/server";

import { auth, signIn } from "~/auth/authjs";
import {
  PageHeader,
  PageHeaderDescription,
} from "~/components/Navigation/PageNavMenu";
import { env } from "~/env";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign into your account",
};

export default async function SignUpPage() {
  const t = await getTranslations();

  const session = await auth();

  const message =
    authProvider === "authjs"
      ? // eslint-disable-next-line @stylistic/max-len
        "Please specify Google, Discord, or GitHub environment variables in your .env file or in Vercel dashboard to unlock NextAuth.js (authjs) features. Or use Clerk instead. Refer to .env.example for more information."
      : // eslint-disable-next-line @stylistic/max-len
        "Please specify Clerk environment variables in your .env file or Vercel dashboard. You may also need to specify some NextAuth.js (auth) variables currently. Or just use NextAuth.js (auth) instead. Refer to .env.example for more information.";

  // if (session) {
  //   return redirect("/");
  // }

  // if (authProvider === "clerk") {
  //   <UserButton />;
  // } else { ... }
  return (
    <div className="my-10 items-center space-y-6 self-center">
      {env.AUTH_SECRET &&
      (env.AUTH_GITHUB_ID || env.AUTH_GOOGLE_ID || env.AUTH_DISCORD_ID) ? (
        <>
          <PageHeader>
            <PageHeaderDescription>
              [temporary note, please remove it]: This page is for the
              NextAuth.js authProvider (for Clerk, please refer to SiteHeader ➞
              UserButton). Please note, as of version 1.2.6, it is better to use
              Clerk as the authProvider (specified in the `reliverse.config.ts`
              file - currently set: {authProvider}) since this Relivator 1.2.6
              version has been more thoroughly tested with Clerk. We are working
              on fixing and improving the stability of NextAuth.js as an
              authentication provider.
              {authProvider === "authjs" && (
                <span className="block">
                  Your current state as user:{" "}
                  {session?.user?.id ? "Logged in" : "Logged out"}
                </span>
              )}
            </PageHeaderDescription>
          </PageHeader>
          <div className="flex space-x-4">
            <form
              action={async () => {
                "use server";
                await signIn("discord");
              }}
            >
              <Button type="submit">{t("page.signinWithDiscord")}</Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Button type="submit">{t("page.signinWithGithub")}</Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button type="submit">{t("page.signinWithGoogle")}</Button>
            </form>
          </div>
          {/* <div>
        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
        >
          <Input type="text" name="email" placeholder="Email" />
          <Button type="submit" variant="secondary">
            Signin with Resend
          </Button>
        </form>
      </div> */}
        </>
      ) : (
        <PageHeader>
          <PageHeaderDescription>{message} </PageHeaderDescription>
        </PageHeader>
      )}
    </div>
  );
}
