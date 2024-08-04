"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/browser/reliverse/ui/Button";
import { Skeleton } from "@/browser/reliverse/ui/Skeleton";
import { SignOutButton } from "@clerk/nextjs";
import { useIsClient } from "@uidotdev/usehooks";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";

import { authProvider } from "~/auth";
import { Icons } from "~/components/Common/Icons";
import { cn } from "~/utils";

export function LogOutButtons() {
  const router = useRouter();
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
        Log out
      </Skeleton>
    );
  }

  return (
    <div className="flex w-full items-center space-x-2">
      {authProvider === "clerk" ? (
        <SignOutButton redirectUrl="/">
          <Button
            aria-label="Log out"
            className="w-full"
            disabled={isPending}
            size="sm"
          >
            {isPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Log out
          </Button>
        </SignOutButton>
      ) : (
        <Button
          aria-label="Log out"
          className="w-full"
          disabled={isPending}
          onClick={() =>
            signOut({
              callbackUrl,
            })
          }
          size="sm"
        >
          Log out
        </Button>
      )}
      <Button
        aria-label="Go back to the previous page"
        className="w-full"
        disabled={isPending}
        onClick={() => {
          router.back();
        }}
        size="sm"
        variant="outline"
      >
        Go back
      </Button>
    </div>
  );
}
