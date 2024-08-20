"use client";

import { useTransition } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/reliverse/cn";
import { SignOutButton } from "@clerk/nextjs";
import { useIsClient } from "@uidotdev/usehooks";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";

import { authProvider } from "~/auth/provider";
import { SpinnerSVG } from "~/components/Common/Icons/SVG";

export function LogOutButtons({
  tLogOut,
  tHome,
  tDashboard,
}: { tDashboard: string; tHome: string; tLogOut: string }) {
  const isMounted = useIsClient();
  const [isPending] = useTransition();
  const locale = useLocale();

  const callbackUrl = `/${locale}/`;

  if (!isMounted) {
    return (
      <Skeleton
        className={cn(
          buttonVariants({
            size: "sm",
          }),
          "w-full bg-muted text-muted-foreground",
        )}
      >
        {tLogOut}
      </Skeleton>
    );
  }

  return (
    <div className="flex w-full items-center space-x-2">
      {authProvider === "clerk" ? (
        <SignOutButton redirectUrl="/">
          <Button
            aria-label={tLogOut}
            className="w-full"
            disabled={isPending}
            size="sm"
          >
            {isPending && <SpinnerSVG className="mr-2 size-4 animate-spin" />}
            {tLogOut}
          </Button>
        </SignOutButton>
      ) : (
        <Button
          aria-label={tLogOut}
          className="w-full"
          disabled={isPending}
          onClick={() =>
            signOut({
              callbackUrl,
            })
          }
          size="sm"
        >
          {tLogOut}
        </Button>
      )}
      <Link
        aria-label="Go to the home page"
        className="w-full"
        href="/"
        size="sm"
        variant="outline"
      >
        {tHome}
      </Link>
      <Link
        aria-label="Go to the dashboard"
        href="/dashboard"
        className="w-full"
        size="sm"
        variant="outline"
      >
        {tDashboard}
      </Link>
    </div>
  );
}
