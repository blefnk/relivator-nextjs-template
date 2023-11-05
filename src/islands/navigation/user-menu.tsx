import Link from "next/link";
import { env } from "~/env.mjs";
import { Link as IntlLink } from "~/navigation";
import { cn } from "~/utils";

import { Avatar, AvatarFallback, AvatarImage } from "~/islands/account/avatar";
import { Icons } from "~/islands/icons";
import { Button, buttonVariants } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/dropdown";
import { getUserData } from "~/utils/users";

export type UserMenuProps = { session: any };

export default async function UserMenu({ session }: UserMenuProps) {
  const user = await getUserData(session);

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} alt={user.username} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.username}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <IntlLink href="/dashboard/account">
                <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                Account
              </IntlLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <IntlLink href="/dashboard/stores">
                <Icons.store className="mr-2 h-4 w-4" aria-hidden="true" />
                Stores
              </IntlLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <IntlLink href="/dashboard/billing">
                <Icons.billing className="mr-2 h-4 w-4" aria-hidden="true" />
                Billing
              </IntlLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <IntlLink href="/dashboard/settings">
                <Icons.settings className="mr-2 h-4 w-4" aria-hidden="true" />
                Settings
              </IntlLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <IntlLink href="/dashboard/purchases">
                <Icons.dollarSign className="mr-2 h-4 w-4" aria-hidden="true" />
                Purchases
              </IntlLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={
                env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk"
                  ? "/sign-out"
                  : "/api/auth/signout"
              }
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mr-2 px-3 w-full start",
              )}
            >
              <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
              Log Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <IntlLink
      href="/auth"
      // @example alternative way: use Link, and conditional href:
      // href={
      //   env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk"
      //     ? "/sign-in"
      //     : "/api/auth/signin"
      // }
      className={cn(buttonVariants({ variant: "secondary" }), "px-3")}
    >
      Sign In
    </IntlLink>
  );
}
