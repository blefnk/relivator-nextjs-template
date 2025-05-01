"use client";

import { LogOut, Settings, Upload, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "~/lib/auth-client";

import { Button } from "~/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Settings", href: "/dashboard/settings" },
    { name: "Uploads", href: "/dashboard/uploads" },
  ];

  const handleSignOut = () => {
    void signOut();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div
          className={`
            container flex h-16 items-center justify-between px-4
            md:px-6
          `}
        >
          <div className="flex items-center gap-6">
            {/* TODO: Display seller's brand name here */}
            {/* <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Acme Store</span>
            </Link> */}
            <nav
              className={`
                hidden
                md:flex
              `}
            >
              <ul className="flex items-center gap-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        text-sm font-medium transition-colors
                        hover:text-primary
                        ${
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span
                      className={`
                        relative flex h-8 w-8 shrink-0 overflow-hidden
                        rounded-full
                      `}
                    >
                      <span
                        className={`
                          flex h-full w-full items-center justify-center
                          rounded-full bg-muted
                        `}
                      >
                        <User className="h-4 w-4" />
                      </span>
                    </span>
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user.name && (
                        <p className="font-medium">{session.user.name}</p>
                      )}
                      {session.user.email && (
                        <p className="text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/uploads">
                      <Upload className="mr-2 h-4 w-4" />
                      Uploads
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
