import type { Metadata } from "next";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";
import { CartProvider } from "~/lib/hooks/use-cart";
import { Footer } from "~/ui/components/footer";
import "~/css/globals.css";
import { Header } from "~/ui/components/header";
import { ThemeProvider } from "~/ui/components/theme-provider";
import { Toaster } from "~/ui/primitives/sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description: "Relivator",
  title: "Relivator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <CartProvider>
            <Header showAuth={true} />
            <main className="flex min-h-screen flex-col">{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
