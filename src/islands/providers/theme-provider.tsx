"use client";

import { ThemeProvider } from "next-themes";

/**
 * Currently we need to specify suppressHydrationWarning in
 * <html> tag to disable the warning in the browser console.
 *
 * @see https://github.com/pacocoursey/next-themes/issues/152
 * @see https://github.com/vercel/next.js/discussions/22388
 * @see https://michaelangelo.io/blog/darkmode-rsc#important-nextjs-caveat
 */

export function NextThemesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
