"use client";

import { useRouter } from "next/navigation";

import { signOut } from "~/lib/auth-client";
import { cn } from "~/lib/cn";
import { useMounted } from "~/lib/hooks/use-mounted";
import { Button, buttonVariants } from "~/ui/primitives/button";
import { Skeleton } from "~/ui/primitives/skeleton";

export function SignOutPageClient() {
  const router = useRouter();
  const mounted = useMounted();

  const handlePageBack = async () => {
    router.back();
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div
      className={`
        flex w-auto flex-col-reverse justify-center gap-2
        sm:flex-row
      `}
    >
      <Button onClick={handlePageBack} size="default" variant="outline">
        Go back
        <span className="sr-only">Previous page</span>
      </Button>
      {mounted ? (
        <Button onClick={handleSignOut} size="default" variant="secondary">
          Log out
          <span className="sr-only">
            This action will log you out of your account.
          </span>
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "default", variant: "secondary" }),
            "bg-muted text-muted-foreground",
          )}
        >
          Log out
        </Skeleton>
      )}
    </div>
  );
}
