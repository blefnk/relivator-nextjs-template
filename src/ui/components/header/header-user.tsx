import {
  BarChart,
  LogOut,
  Settings,
  Shield,
  Upload,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

import { cn } from "~/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/primitives/avatar";
import { Button } from "~/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";

interface HeaderUserDropdownProps {
  isDashboard: boolean;
  userEmail: string;
  userImage?: null | string;
  userName: string;
}

export function HeaderUserDropdown({
  isDashboard = false,
  userEmail,
  userImage,
  userName,
}: HeaderUserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative overflow-hidden rounded-full"
          size="icon"
          variant="ghost"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              alt={userName || "User"}
              src={userImage || undefined}
            />
            <AvatarFallback>
              {userName ? (
                userName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
              ) : (
                <UserIcon className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage
              alt={userName || "User"}
              src={userImage || undefined}
            />
            <AvatarFallback>
              {userName ? (
                userName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
              ) : (
                <UserIcon className="h-4 w-4 text-primary" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{userName || "User"}</p>
            <p
              className={"max-w-[160px] truncate text-xs text-muted-foreground"}
            >
              {userEmail}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/stats">
            <BarChart className="mr-2 h-4 w-4" />
            Stats
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/uploads">
            <Upload className="mr-2 h-4 w-4" />
            Uploads
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/admin/summary">
            <Shield className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className={cn(
            "cursor-pointer",
            isDashboard
              ? "text-red-600"
              : `
                txt-destructive
                focus:text-destrctive
              `,
          )}
        >
          <Link href="/auth/sign-out">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
