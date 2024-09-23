import Link from "next/link";

import { SignedIn, SignInButton } from "@clerk/nextjs";
import { debugEnabled } from "~/../reliverse.config";
import {
  CreditCard,
  DollarSign,
  FileTerminal,
  Laptop,
  LogOut,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import { SignOutButton } from "~/core/auth/authjs/components/sign-out-button";
import { env } from "~/env";
import { cn } from "~/utils/cn";
import { getInitials } from "~/utils/misc";

export default async function UserMenu() {
  const t = await getTranslations();

  const user = await authjs();

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
                src={user.image || "https://bleverse.com/logo.png"}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard">
                <Laptop className="mr-2 size-4" aria-hidden="true" />
                {t("usermenu.dashboard.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/stores">
                <ShoppingBag className="mr-2 size-4" aria-hidden="true" />
                {t("usermenu.stores.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/billing">
                <CreditCard className="mr-2 size-4" aria-hidden="true" />
                {t("usermenu.billing.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/account">
                <User className="mr-2 size-4" aria-hidden="true" />
                {t("usermenu.account.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/settings">
                <Settings className="mr-2 size-4" aria-hidden="true" />
                {t("usermenu.settings.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/purchases">
                <DollarSign className="mr-2 size-4" aria-hidden="true" />
                {t("usermenu.purchases.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/admin">
                <FileTerminal className="mr-2 size-4" aria-hidden="true" />
                {t("usermenu.adminpage.menu")}
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
                      <LogOut className="mr-2 size-4" aria-hidden="true" />
                      {t("usermenu.logout.menu")}
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
