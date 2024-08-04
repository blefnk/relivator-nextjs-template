import type { ReactNode } from "react";

import { defaultLocale } from "~/navigation";

// This is the root layout component that wraps the entire application
// Please navigate to src/app/layout.tsx to see inner main app layout
// Displays ./page.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  if (defaultLocale) {
    return children;
  }

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
