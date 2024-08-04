import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { Toaster } from "@/browser/reliverse/ui/Toaster";
import { cn } from "@/browser/shared/utils";
import { ourFileRouter } from "@/server/reliverse/api/uploadthing/core";
import { config } from "@reliverse/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { hideTailwindIndicator } from "reliverse.config";
import { extractRouterConfig } from "uploadthing/server";

import { siteConfig } from "~/app";
import { ComboboxProvider } from "~/components/Combobox/ComboboxContext";
import { LoglibAnalytics } from "~/components/Common/loglib-analytics";
import { TailwindScreens } from "~/components/Common/tailwind-indicator";
import { AuthProvider } from "~/components/Providers/AuthProvider";
import { ThemeProvider } from "~/components/Providers/ThemeProvider";
import { TRPC } from "~/core/trpc/react";
import { env } from "~/env";
import { defaultLocale, locales } from "~/navigation";

import "~/styles/globals.css";

// import "@radix-ui/themes/styles.css";
// import "@xyflow/react/dist/style.css";
//
// Each page in the app will have the following metadata - you can override
// them by defining the metadata in the page.tsx or in children layout.tsx.
// By the way, we only need the getTranslations on async components
// useTranslations works both on the server and the client side.
//
const baseMetadataURL = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
};

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    // metadataBase: new URL(baseMetadataURL),
    // openGraph: { images: ["/og.png"] },
    alternates: {
      canonical: new URL(baseMetadataURL),
    },
    applicationName: siteConfig.name,
    authors: [
      {
        name: siteConfig.author.handle,
        url: config.social.github,
      },
    ],
    creator: siteConfig.author.handle,
    description: t("metadata.description"),
    icons: {
      icon: `${baseMetadataURL}/logo.png`,
    },
    keywords: siteConfig.keywords,
    manifest: absoluteUrl("/site.webmanifest"),
    openGraph: {
      alternateLocale: locales.filter((locale) => locale !== defaultLocale),
      description: t("metadata.description"),
      images: [
        {
          alt: siteConfig.images[0].alt,
          url: `${baseMetadataURL}/og-image.png`,
        },
      ],
      locale: defaultLocale,
      siteName: siteConfig.name,
      title: siteConfig.name,
      type: "website",
      url: baseMetadataURL,
    },
    other: {
      "darkreader-lock": "meta",
    },
    publisher: siteConfig.appPublisher,
    robots: {
      follow: true,
      index: true,
    },
    title: {
      default: siteConfig.name,
      template: `%s – ${siteConfig.appNameDesc}`,
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.author.handleAt,
      description: t("metadata.description"),
      images: [`${baseMetadataURL}/og-image.png`],
      site: siteConfig.author.handleAt,
      title: siteConfig.name,
    },
  };

  return metadata;
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { color: "white", media: "(prefers-color-scheme: light)" },
    { color: "black", media: "(prefers-color-scheme: dark)" },
  ],
};

// import { Inter as FontSans } from "next/font/google";
// const fontSans = FontSans({ subsets: ["latin"],
// variable: "--font-sans" });
// const fontSans = localFont({
//   src: "../../styles/fonts/GeistVF.woff",
//   variable: "--font-sans",
// });
const fontSans = localFont({
  src: "../../styles/fonts/FiraSans-Regular.ttf",
  variable: "--font-sans",
  display: "swap",
  weight: "400",
});

const fontMono = localFont({
  src: "../../styles/fonts/GeistMonoVF.woff",
  variable: "--font-mono",
});

// Chromium browsers flags emojis fix
const fontFlag = localFont({
  display: "auto",
  src: "../../styles/fonts/Twemoji-Flags.woff2",
  variable: "--font-twemoji",
});

// This is the "root" layout. It checks for valid locales,
// sets up the fonts, themes, analytics, providers, & more.
// This file serves as the primary entry point for the app.
//
// @see https://github.com/blefnk/relivator
export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  params: {
    locale: string;
  };
  children: ReactNode;
}>) {
  if (!locales.includes(locale)) {
    return notFound();
  }

  const messages = await getMessages();
  const isTailwindIndicatorEnabled = hideTailwindIndicator === false;

  return (
    <html lang={locale} suppressHydrationWarning>
      <AuthProvider locale={locale}>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
            fontFlag.variable,
          )}
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <TRPC data={headers()}>
            <ThemeProvider>
              <NextIntlClientProvider messages={messages}>
                <ComboboxProvider>
                  {children}
                  {/* <Reliverse /> */}
                  {isTailwindIndicatorEnabled && <TailwindScreens />}
                </ComboboxProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
          </TRPC>
          <Toaster />
          <LoglibAnalytics />
          <VercelAnalytics />
          <SpeedInsights />
        </body>
      </AuthProvider>
    </html>
  );
}
