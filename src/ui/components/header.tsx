"use client";

import { LogOut, Menu, Settings, Shield, Upload, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { signOut, useSession } from "~/lib/auth-client";
import { cn } from "~/lib/cn";
import { Cart } from "~/ui/components/cart";
import { Button } from "~/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";

import { NotificationsWidget } from "./notifications/notifications-widget";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  children?: React.ReactNode;
  isDashboard?: boolean;
  showAuth?: boolean;
}

export function Header({ isDashboard = false, showAuth = true }: HeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    void signOut();
  };

  const mainNavigation = [
    { href: "/", name: "Home" },
    { href: "/products", name: "Products" },
  ];

  const dashboardNavigation = [
    { href: "/dashboard", name: "Dashboard" },
    { href: "/dashboard/profile", name: "Profile" },
    { href: "/dashboard/settings", name: "Settings" },
    { href: "/dashboard/uploads", name: "Uploads" },
    { href: "/admin", name: "Admin" },
  ];

  const navigation = isDashboard ? dashboardNavigation : mainNavigation;

  const renderContent = () => (
    <header
      className={`
        sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur
        supports-[backdrop-filter]:bg-background/60
      `}
    >
      <div
        className={`
          container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-2" href="/">
              <span
                className={cn(
                  "text-xl font-bold",
                  !isDashboard &&
                    `
                      bg-gradient-to-r from-primary to-primary/70 bg-clip-text
                      tracking-tight text-transparent
                    `,
                )}
              >
                Relivator
              </span>
            </Link>
            <nav
              className={`
                hidden
                md:flex
              `}
            >
              <ul className="flex items-center gap-6">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname?.startsWith(item.href));

                  return (
                    <li key={item.name}>
                      <Link
                        className={cn(
                          `
                            text-sm font-medium transition-colors
                            hover:text-primary
                          `,
                          isActive
                            ? "font-semibold text-primary"
                            : "text-muted-foreground",
                        )}
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!isDashboard && <Cart />}

            <NotificationsWidget />

            {showAuth && (
              <div
                className={`
                  hidden
                  md:block
                `}
              >
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="relative overflow-hidden rounded-full"
                        size="icon"
                        variant="ghost"
                      >
                        {session.user?.image ? (
                          <img
                            alt={session.user.name || "User"}
                            className="h-9 w-9 rounded-full object-cover"
                            src={session.user.image}
                          />
                        ) : (
                          <span
                            className={`
                              flex h-8 w-8 items-center justify-center
                              rounded-full bg-muted
                            `}
                          >
                            <User className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div
                          className={`
                            flex h-8 w-8 items-center justify-center
                            rounded-full bg-primary/10
                          `}
                        >
                          {session.user?.image ? (
                            <img
                              alt={session.user.name || "User"}
                              className="h-7 w-7 rounded-full object-cover"
                              src={session.user.image}
                            />
                          ) : (
                            <User className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex flex-col space-y-0.5">
                          <p className="text-sm font-medium">
                            {session.user?.name || "User"}
                          </p>
                          <p
                            className={`
                              max-w-[160px] truncate text-xs
                              text-muted-foreground
                            `}
                          >
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          className="cursor-pointer"
                          href="/dashboard/profile"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          className="cursor-pointer"
                          href="/dashboard/settings"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          className="cursor-pointer"
                          href="/dashboard/uploads"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Uploads
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link className="cursor-pointer" href="/admin">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={cn(
                          "cursor-pointer",
                          isDashboard
                            ? "text-red-600"
                            : `
                              text-destructive
                              focus:text-destructive
                            `,
                        )}
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/auth/sign-in">
                      <Button size="sm" variant="ghost">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button size="sm">Sign up</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {!isDashboard && <ThemeToggle />}

            {/* Mobile menu button */}
            <Button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              size="icon"
              variant="ghost"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 border-b px-4 py-3">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : `
                        text-foreground
                        hover:bg-muted/50 hover:text-primary
                      `,
                  )}
                  href={item.href}
                  key={item.name}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {showAuth && !session && (
            <div className="space-y-1 border-b px-4 py-3">
              <Link
                className={`
                  block rounded-md px-3 py-2 text-base font-medium
                  hover:bg-muted/50
                `}
                href="/auth/sign-in"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                className={`
                  block rounded-md bg-primary px-3 py-2 text-base font-medium
                  text-primary-foreground
                  hover:bg-primary/90
                `}
                href="/auth/sign-up"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );

  return renderContent();
}
