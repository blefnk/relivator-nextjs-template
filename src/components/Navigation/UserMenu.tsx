import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/utils/reliverse/cn";
import { getInitials } from "@/utils/reliverse/misc";
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
import { SignOutButton } from "~/core/auth/authjs/components/sign-out-button";
import { env } from "~/env";

export default async function UserMenu() {
  const t = await getTranslations();

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
                src={user.image || "https://relivator.reliverse.org/logo.png"}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" forceMount>
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
                <Laptop aria-hidden="true" className="mr-2 size-4" />
                {t("usermenu.dashboard.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/stores">
                <ShoppingBag aria-hidden="true" className="mr-2 size-4" />
                {t("usermenu.stores.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/billing">
                <CreditCard aria-hidden="true" className="mr-2 size-4" />
                {t("usermenu.billing.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/account">
                <User aria-hidden="true" className="mr-2 size-4" />
                {t("usermenu.account.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/settings">
                <Settings aria-hidden="true" className="mr-2 size-4" />
                {t("usermenu.settings.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Link className="flex items-center" href="/dashboard/purchases">
                <DollarSign aria-hidden="true" className="mr-2 size-4" />
                {t("usermenu.purchases.menu")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="/dashboard/admin">
                <FileTerminal aria-hidden="true" className="mr-2 size-4" />
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
                      <LogOut aria-hidden="true" className="mr-2 size-4" />
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
