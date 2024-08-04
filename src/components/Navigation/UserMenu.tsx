import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/browser/reliverse/ui/Avatar";
import { Button, buttonVariants } from "@/browser/reliverse/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/browser/reliverse/ui/Dropdown";
import { SignedIn, SignInButton } from "@clerk/nextjs";
import { debugEnabled } from "reliverse.config";

import { authProvider } from "~/auth";
import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { Icons } from "~/components/Common/Icons";
import { SignOutButton } from "~/core/auth/authjs/components/sign-out-button";
import { env } from "~/env";
import { cn, getInitials } from "~/utils";

export default async function UserMenu() {
  const user = authProvider === "clerk" ? await clerk() : await authjs();

  const initials = await getInitials(user.name || "TestUser");

  if (debugEnabled) {
    console.log(user.id, user.name, user.email, user.image);
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative size-8 rounded-full" variant="secondary">
            <Avatar className="size-8">
              <AvatarImage
                alt={user.name}
                src={user.image || "https://relivator.bleverse.com/logo.png"}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p
                className={`
                text-xs leading-none text-muted-foreground
              `}
              >
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/stores">
                <Icons.store aria-hidden="true" className="mr-2 size-4" />
                Stores
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/billing">
                <Icons.billing aria-hidden="true" className="mr-2 size-4" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/account">
                <Icons.user aria-hidden="true" className="mr-2 size-4" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/settings">
                <Icons.settings aria-hidden="true" className="mr-2 size-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/purchases">
                <Icons.dollarSign aria-hidden="true" className="mr-2 size-4" />
                Purchases
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard">
                <Icons.laptop aria-hidden="true" className="mr-2 size-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/admin">
                <Icons.terminal aria-hidden="true" className="mr-2 size-4" />
                Admin Page
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {authProvider === "authjs" && (
              <div
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "mr-2 w-full px-3",
                )}
              >
                <SignOutButton />
              </div>
            )}
            {authProvider === "clerk" &&
              env.CLERK_SECRET_KEY &&
              env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
                <>
                  <SignedIn>
                    <Link
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                        }),
                        "mr-2 w-full px-3",
                      )}
                      href="/auth/sign-out"
                    >
                      <Icons.logout
                        aria-hidden="true"
                        className="mr-2 size-4"
                      />
                      Log Out
                    </Link>
                  </SignedIn>
                </>
              )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <SignInButton />;
}
