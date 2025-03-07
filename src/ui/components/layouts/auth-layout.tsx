import Link from "next/link";
import { ThemeToggle } from "~/ui/components/theme-toggle";

type AuthLayoutProps = {
  children: React.ReactNode;
  heading: string;
  subheading?: string;
  backLink?: {
    href: string;
    label: string;
  };
  showLogo?: boolean;
};

export function AuthLayout({
  children,
  heading,
  subheading,
  backLink,
  showLogo = true,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6">
            {showLogo && (
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold">Relivator</span>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{heading}</h1>
            {subheading && (
              <p className="text-muted-foreground">{subheading}</p>
            )}
          </div>
          {children}
          {backLink && (
            <div className="mt-4 text-center text-sm">
              <Link
                href={backLink.href}
                className="underline underline-offset-4 hover:text-primary"
              >
                {backLink.label}
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
