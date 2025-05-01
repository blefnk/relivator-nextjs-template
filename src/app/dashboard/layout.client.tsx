"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const pathname = usePathname();

  const navigation = [
    { href: "/dashboard", name: "Dashboard" },
    { href: "/dashboard/profile", name: "Profile" },
    { href: "/dashboard/settings", name: "Settings" },
    { href: "/dashboard/uploads", name: "Uploads" },
  ];

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
                      className={`
                        text-sm font-medium transition-colors
                        hover:text-primary
                        ${
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      `}
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
