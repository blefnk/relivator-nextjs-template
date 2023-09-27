/**
 * This file is the `locale` root of the app. Everything starts here for rendering a UI.
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */

import "~/styles/globals.css";

import { PropsWithChildren } from "react";
import {
  Playfair_Display as FontHeading,
  Inter as FontSans,
} from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { siteConfig } from "~/app";
import { defaultLocale, locales } from "~/i18n/locales";
import { WithChildren, type LocaleLayoutParams } from "~/types";
import { getServerSession } from "next-auth";

import { authOptions } from "~/server/auth";
import { cn } from "~/server/utils";
import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import LoglibAnalytics from "~/islands/loglib-analytics";
import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";
import { TooltipProvider } from "~/islands/primitives/tooltip";
import { TailwindIndicator } from "~/islands/providers/indicators/tailwind-indicator";
import { NextIntlProvider } from "~/islands/providers/nextintl-provider";
import NextAuthProvider from "~/islands/providers/session-provider";
import { NextThemesProvider } from "~/islands/providers/theme-provider";
import { ToasterNotifier } from "~/islands/wrappers/toaster";
import TrpcQueryProvider from "~/islands/wrappers/trpc/trpc-query-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "500",
});

/**
 * Every page in the app will have this metadata.
 * You can override it by defining the `metadata`
 * in the `page.tsx` or in children `layout.tsx`.
 */
export const metadata = seo({
  metadataBase: fullURL(),
  title: {
    default: siteConfig.name,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  viewport: "width=device-width, initial-scale=1",
  creator: siteConfig.author,
  publisher: "Bleverse",
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  robots: "index, follow",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  applicationName: "Bleverse Relivator",
  alternates: {
    canonical: "https://relivator.bleverse.com",
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
        alt: "Bleverse Relivator",
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
});

type LocaleLayoutProps = PropsWithChildren<LocaleLayoutParams>;

export default async function LocaleLayout({
  children, // share page or nested layout
  params: { locale }, // share user locale
}: WithChildren<LocaleLayoutProps>) {
  /**
   * Next.js 13 internationalization library
   * @see https://next-intl-docs.vercel.app
   */
  let messages: any;
  try {
    messages = (await import(`~/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    console.log("❌ Internationalization", error);
  }

  /**
   * _For debug purposes_ use this to check the session object:
   * @example ```<pre>{JSON.stringify(session, null, 2)}</pre>```
   * @see https://next-auth.js.org/configuration/nextjs#in-app-router
   */
  const session = await getServerSession(authOptions());

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <NextIntlProvider locale={locale} messages={messages}>
          <NextAuthProvider session={session}>
            <NextThemesProvider>
              <TrpcQueryProvider>
                <TooltipProvider>
                  <SiteHeader />
                  {children}
                  <SiteFooter />
                </TooltipProvider>
                <TailwindIndicator />
                <ToasterNotifier />
                <LoglibAnalytics />
                <VercelAnalytics />
              </TrpcQueryProvider>
            </NextThemesProvider>
          </NextAuthProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}

// [💡 INTERESTING THINGS SECTION 💡]

/**
 * ?? Important Nextjs Caveat
 *
 * Good to know: cookies() is a Dynamic Function whose returned values cannot be
 * known ahead of time. Using it in a layout or page will opt a route
 * into dynamic rendering at request time.
 *
 * This caveat means that putting cookies() in the Layout.tsx component will
 * disable static rendering for the entire app. You may not want to
 * do this if you have a large app with many static pages.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/cookies
 * @see https://michaelangelo.io/blog/darkmode-rsc#important-nextjs-caveat
 * @see https://github.com/pacocoursey/next-themes/issues/152#issuecomment-1693979442
 */

// [ IMPLEMENT ]

/**
 * import { PackagesIndicator } from "~/islands/packages-indicator";
 * import { VariableIndicator } from "~/islands/variable-indicator";
 * ?...
 * <PackagesIndicator />
 * <VariableIndicator />
 */
