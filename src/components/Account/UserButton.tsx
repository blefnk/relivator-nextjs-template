import Link from "next/link";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { debugEnabled } from "~/../reliverse.config";
import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { ButtonPlaceholder } from "~/components/Common/placeholders";
import UserMenu from "~/components/Navigation/UserMenu";
import { Button, buttonVariants } from "~/components/ui/button";
import { env } from "~/env";
import { cn } from "~/utils/cn";

export async function UserButton() {
  const t = await getTranslations();

  const user = await authjs();

  if (debugEnabled) {
    console.log(user.id, user.email);
  }

  if (
    authProvider === "clerk" &&
    env.CLERK_SECRET_KEY &&
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ) {
    return (
      <>
        <SignedIn>
          <UserMenu />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="secondary">{t("UserButton.signIn")}</Button>
          </SignInButton>
        </SignedOut>
      </>
    );
  } else if (
    authProvider === "authjs" &&
    env.AUTH_SECRET &&
    (env.AUTH_GITHUB_ID || env.AUTH_GOOGLE_ID || env.AUTH_DISCORD_ID)
  ) {
    if (user.id !== "guestId") {
      return <UserMenu />;
    } else {
      return (
        <Link
          className={cn(
            buttonVariants({
              variant: "secondary",
            }),
            "whitespace-nowrap px-3",
          )}
          href="/auth/sign-in"
        >
          Sign In
        </Link>
      );
    }
  } else {
    return <ButtonPlaceholder />;
  }
}
