import { ClerkProvider } from "@clerk/nextjs";
import { siteConfig } from "~/app";

import { defaultLocale, localeList } from "~/data/i18n";
import LoglibAnalytics from "~/islands/loglib-analytics";
import { TailwindIndicator } from "~/islands/tailwind-indicator";

import "~/styles/globals.css";

import type { Metadata } from "next";

import { PageParams } from "~/types/page-params";
import { WithChildren } from "~/types/with-children";
import { fontMono, fontSans } from "~/server/fonts";
import { cn } from "~/server/utils";
import { Providers } from "~/islands/common/providers";
import { env } from "~/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  viewport: "width=device-width, initial-scale=1",
  creator: siteConfig.author,
  publisher: "Bleverse",
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author
    }
  ],
  robots: "index, follow",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  applicationName: "Bleverse Relivator",
  alternates: {
    canonical: "https://relivator.bleverse.com"
  },
  openGraph: {
    type: "website",
    locale: defaultLocale,
    alternateLocale: localeList.filter((locale) => locale !== defaultLocale),
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url.base,
    title: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1280,
        height: 640,
        alt: "Bleverse Relivator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url.base}/og-image.png`],
    creator: siteConfig.author
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default async function RootLayout({
  children,
  params
}: WithChildren<PageParams>) {
  const clerkLocale = (await import(`~/data/i18n/dicts/${params.locale}`))
    .default;

  return (
    <ClerkProvider localization={clerkLocale}>
      <html
        lang={params.locale}
        className="dark"
        style={{ colorScheme: "dark" }}
        suppressHydrationWarning
      >
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Providers locale={params.locale}>
            {children}
            <LoglibAnalytics />
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
