import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "~/app";

import { defaultLocale, localeList } from "~/data/i18n";
import LoglibAnalytics from "~/islands/loglib-analytics";
import { TailwindIndicator } from "~/islands/tailwind-indicator";

import "~/styles/globals.css";

import type { Metadata } from "next";
import {
  Playfair_Display as FontHeading,
  Inter as FontSans
} from "next/font/google";
import { PageParams, WithChildren } from "~/types";

import { cn } from "~/server/utils";
import { env } from "~/data/env";
import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import { ClientProviders } from "~/islands/modules/client-providers";

export const metadata: Metadata = {
  metadataBase: fullURL(),
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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "500"
});

export default async function RootLayout({
  children,
  params
}: WithChildren<PageParams>) {
  const clerkLocale = (await import(`~/data/i18n/dicts/${params.locale}`))
    .default;

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          "debug-mode-enabled min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ClientProviders locale={params.locale}>
          <ClerkProvider localization={clerkLocale}>{children}</ClerkProvider>
        </ClientProviders>

        <TailwindIndicator />
        <LoglibAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
