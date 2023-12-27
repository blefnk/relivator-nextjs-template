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
import { Link } from "~/navigation";
import { getServerAuthSession, getUserData } from "~/utils/auth/users";

export default async function UserMenu() {
  const session = await getServerAuthSession();
  const data = await getUserData(session);

  const username = data.username;
  const image = data.image;
  const initials = data.initials;
  const email = data.email;

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={image} alt={username} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{username}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/dashboard/stores" className="flex items-center">
                <Icons.store className="mr-2 h-4 w-4" aria-hidden="true" />
                Stores
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/billing" className="flex items-center">
                <Icons.billing className="mr-2 h-4 w-4" aria-hidden="true" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/account" className="flex items-center">
                <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/settings" className="flex items-center">
                <Icons.settings className="mr-2 h-4 w-4" aria-hidden="true" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/purchases" className="flex items-center">
                <Icons.dollarSign className="mr-2 h-4 w-4" aria-hidden="true" />
                Purchases
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/admin" className="flex items-center">
                <Icons.terminal className="mr-2 h-4 w-4" aria-hidden="true" />
                Admin Page
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              href="/sign-out"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "start mr-2 w-full px-3",
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
    <Link
      href="/sign-in"
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "whitespace-nowrap px-3",
      )}
    >
      Sign In
    </Link>
  );
}
