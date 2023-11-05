/**
 * Layout file for internationalized-first rendering in the Next.js app.
 * This file serves as the primary entry point for handling UI rendering.
 *
 * Learn more about the Relivator Next.js project:
 * @see https://github.com/blefnk/relivator#readme
 */

import "~/styles/globals.css";

import { PropsWithChildren } from "react";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { siteConfig } from "~/app";
import { getNextAuthServerSession } from "~/auth";
import { defaultLocale, locales } from "~/navigation";
import { WithChildren, type LocaleLayoutParams } from "~/types";
import { cn } from "~/utils";

import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import { ReactHotToast } from "~/islands/application/overlays/notifications/react-hot-toast";
import LoglibAnalytics from "~/islands/loglib-analytics";
import { TooltipProvider } from "~/islands/primitives/tooltip";
import { Debug } from "~/islands/providers/indicators/debug-indicator";
import { ShowErrors } from "~/islands/providers/indicators/errors-indicators";
import { TailwindScreens } from "~/islands/providers/indicators/tailwind-indicator";
import { NextIntlProvider } from "~/islands/providers/nextintl-provider";
import NextAuthProvider from "~/islands/providers/session-provider";
import { NextThemesProvider } from "~/islands/providers/theme-provider";
import { TrpcTanstackProvider } from "~/utils/trpc/react";

// @example opt out of caching for all data requests in the route segment
// export const dynamic = "force-dynamic";
// @example enable edge runtime, but some errors on windows are possible
// export const runtime = "edge";

// Every page in the app will have this metadata, You can override it by
// defining the `metadata` in the `page.tsx` or in children `layout.tsx`
export const metadata = seo({
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

/**
 * LocaleLayoutProps extends from PropsWithChildren, a utility type
 * that automatically infers and includes the 'children' prop, making it
 * suitable for components that expect to receive children elements.
 */
type LocaleLayoutProps = PropsWithChildren<LocaleLayoutParams>;

/**
 * This component handles the layout for different locales. It dynamically loads
 * translation messages, checks for valid locales, and sets up the page
 * with appropriate fonts, themes, analytics tools, and much more.
 */
export default async function LocaleLayout({
  children,
  params: { locale },
}: WithChildren<LocaleLayoutProps>) {
  // Validate the incoming 'locale' parameter to ensure it's supported
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound(); // Redirect if the locale is invalid

  // Dynamically load internationalization messages based on the current locale
  let messages: any;
  try {
    messages = (await import(`~/data/i18n/${locale}.json`)).default;
  } catch (error) {
    console.error("❌ Error loading internationalization messages", error);
    notFound(); // Redirect to 'Not Found' page if messages can't be loaded
  }

  // Retrieve the authentication session state for the current layout request
  const session = await getNextAuthServerSession();

  // Render the layout with internationalization, themes, analytics, and more
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontHeading.variable,
          fontSans.variable,
        )}
      >
        <NextIntlProvider locale={locale} messages={messages}>
          <TrpcTanstackProvider headers={headers()}>
            <NextThemesProvider>
              <ReactHotToast />
              <NextAuthProvider session={session}>
                <TooltipProvider>
                  <ClerkProvider>
                    <Debug hide />
                    <ShowErrors />
                    {children}
                  </ClerkProvider>
                </TooltipProvider>
              </NextAuthProvider>
              <TailwindScreens />
              <LoglibAnalytics />
              <VercelAnalytics />
            </NextThemesProvider>
          </TrpcTanstackProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
