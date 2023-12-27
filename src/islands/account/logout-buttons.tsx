"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { cn } from "~/utils";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";

import { env } from "~/env.mjs";
import { useIsClient } from "~/hooks/use-is-client";
import { Icons } from "~/islands/icons";
import { Button, buttonVariants } from "~/islands/primitives/button";
import { Skeleton } from "~/islands/primitives/skeleton";

export function LogOutButtons() {
  const router = useRouter();
  const mounted = useIsClient();
  const [isPending, startTransition] = React.useTransition();

  const locale = useLocale();
  const callbackUrl = `/${locale}/`;

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ?
        <>
          {env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" ?
            <>
              <SignOutButton
                signOutCallback={() =>
                  startTransition(() => {
                    router.push("/");
                  })
                }
              >
                <Button
                  aria-label="Log out"
                  size="sm"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Log out
                </Button>
              </SignOutButton>
            </>
          : <>
              <Button
                aria-label="Log out"
                size="sm"
                className="w-full"
                disabled={isPending}
                onClick={() => signOut({ callbackUrl })}
              >
                Log out
              </Button>
            </>
          }
        </>
      : <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground",
          )}
        >
          Log out
        </Skeleton>
      }

      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  );
}
