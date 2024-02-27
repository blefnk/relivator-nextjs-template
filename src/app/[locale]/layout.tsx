/**
 * Layout file for internationalized-first rendering in the Next.js app.
 * This file serves as the primary entry point for handling UI rendering.
 *
 * Learn more about the Relivator Next.js starter:
 * @see https://github.com/blefnk/relivator#readme
 */

import "~/styles/globals.css";

import type { PropsWithChildren } from "react";
import { type Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ShowInfo } from "~/indicators-error";
import type { LocaleLayoutParams, WithChildren } from "~/types";
import { cn } from "~/utils";
import { Flowbite, ThemeModeScript } from "flowbite-react";

import { siteConfig } from "~/app";
import { TRPC } from "~/core/trpc/react";
// import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import { ReactHotToasts } from "~/islands/application/overlays/notifications/react-hot-toast";
import LoglibAnalytics from "~/islands/loglib-analytics";
import AuthProvider from "~/islands/providers/auth-provider";
import { customTheme } from "~/islands/providers/flowbite-theme";
import { TailwindScreens } from "~/islands/providers/indicators/tailwind-indicator";
import { NextThemesProvider } from "~/islands/providers/theme-provider";
import { TooltipProvider } from "~/islands/providers/tooltip";
import ZustandProvider from "~/islands/providers/zustand";
import { defaultLocale, locales } from "~/navigation";
import { Room } from "~/plugins/million/islands/room";

// Every page in the app will have this metadata, You can override it by
// defining the `metadata` in the `page.tsx` or in children `layout.tsx`
// export const metadata = seo({
export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: {
    default: siteConfig.name,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.author,
  publisher: siteConfig.author,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  robots: "index, follow",
  applicationName: siteConfig.name,
  alternates: {
    canonical: fullURL(),
  },
  openGraph: {
    type: "website",
    locale: defaultLocale,
    alternateLocale: locales.filter((locale) => locale !== defaultLocale),
    // alternateLocale: locales
    //   .filter((cur) => cur.code !== defaultLocale)
    //   .map((cur) => cur.code),
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url.base,
    title: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1280,
        height: 640,
        alt: `${siteConfig.name} Website OG Image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url.base}/og-image.png`],
    creator: siteConfig.author,
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "darkreader-lock": "true",
  },
};
// });

const fontSans = localFont({
  src: "../../styles/fonts/inter.woff2",
  variable: "--font-sans",
  display: "swap",
});
const fontHeading = localFont({
  src: "../../styles/fonts/inter.woff2",
  variable: "--font-heading",
  weight: "600",
  display: "swap",
});

// @example remote fonts
/* import { Roboto as FontHeading, Inter as FontSans } from "next/font/google";
const fontSans = FontSans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});
const fontHeading = FontHeading({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  weight: "500",
}); */

/**
 * LocaleLayoutProperties extends from PropsWithChildren, a utility type
 * that automatically infers and includes the 'children' prop, making it
 * suitable for components that expect to receive children elements.
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 */
type LocaleLayoutProperties = PropsWithChildren<LocaleLayoutParams>;

// @example opt out of caching for all data requests in the route segment
// export const dynamic = "force-dynamic";
// @example enable edge runtime, but some errors on windows are possible
// export const runtime = "edge";

/**
 * This component handles the layout for different locales. It dynamically loads
 * translation messages, checks for valid locales, and sets up the page
 * with appropriate fonts, themes, analytics tools, and much more.
 */
export default async function LocaleLayout({
  children,
  params: { locale },
}: WithChildren<LocaleLayoutProperties>) {
  // Validate the incoming 'locale' parameter to ensure it's supported
  if (!locales.includes(locale as any)) notFound(); // Redirect if not
  // Render the layout with internationalization
  // theme, analytics, other providers, and more
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontHeading.variable,
          fontSans.variable,
        )}
      >
        <TRPC data={headers()}>
          <NextThemesProvider>
            <ReactHotToasts />
            <TooltipProvider>
              <ZustandProvider>
                <AuthProvider>
                  <Flowbite theme={{ theme: customTheme }}>
                    <ShowInfo />
                    {children}
                  </Flowbite>
                </AuthProvider>
              </ZustandProvider>
            </TooltipProvider>
            <TailwindScreens />
            <LoglibAnalytics />
          </NextThemesProvider>
        </TRPC>
      </body>
    </html>
  );
}
