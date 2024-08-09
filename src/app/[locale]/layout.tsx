import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { Toaster } from "@/components/ui/toaster";
import { ourFileRouter } from "@/server/reliverse/api/uploadthing/core";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/utils";
import { config as reliverse } from "@reliverse/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getTranslations } from "next-intl/server";
import { hideTailwindIndicator } from "reliverse.config";
import { extractRouterConfig } from "uploadthing/server";

import { siteConfig } from "~/app";
import { LoglibAnalytics } from "~/components/Common/loglib-analytics";
import { TailwindScreens } from "~/components/Common/tailwind-indicator";
import { SiteFooter } from "~/components/Navigation/SiteFooter";
import { SiteHeader } from "~/components/Navigation/SiteHeader";
import { AuthProvider } from "~/components/Providers/AuthProvider";
import { ThemeProvider } from "~/components/Providers/ThemeProvider";
import { env } from "~/env";
import { defaultLocale, locales } from "~/navigation";

import "~/styles/globals.css";

// @reliverse/themes (coming soon)
// import "@radix-ui/themes/styles.css";
// import "@xyflow/react/dist/style.css";
//
// Each page in the app will have the following metadata - you can override
// them by defining the metadata in the page.tsx or in children layout.tsx.
// By the way, we only need the getTranslations on async components
// useTranslations works both on the server and the client side.
const baseMetadataURL = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// const absoluteUrl = (path: string) => {
//   return `${env.NEXT_PUBLIC_APP_URL}${path}`;
// };

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    alternates: {
      canonical: new URL(baseMetadataURL),
    },
    applicationName: siteConfig.name,
    authors: [
      {
        name: siteConfig.author.handle,
        url: reliverse.social.github,
      },
    ],
    creator: siteConfig.author.handle,
    description: t("metadata.description"),
    icons: [{ rel: "icon", url: "/favicon.ico" }],

    // icons: {
    //   icon: `${baseMetadataURL}/logo.png`,
    // },
    keywords: siteConfig.keywords,
    openGraph: {
      alternateLocale: locales.filter((locale) => locale !== defaultLocale),
      description: t("metadata.description"),
      images: [`${baseMetadataURL}/og.png`],

      // images: [
      //   {
      //     alt: siteConfig.images[0].alt,
      //     url: `${baseMetadataURL}/og-image.png`,
      //   },
      // ],
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
export default async function RootLocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  params: {
    locale: string;
  };
  children: ReactNode;
}>) {
  // @see https://github.com/blefnk/relivator
  if (!locales.includes(locale)) {
    return notFound();
  }

  // Uncomment if you want next-intl to be available on both client and server components.
  // By default, it is available on server components, while for "use client" components it
  // should be passed as props. If you uncomment, it may impact the project's performance.
  // const messages = await getMessages(); // Uncomment NextIntlClientProvider as well.

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
          <TRPCReactProvider>
            <ThemeProvider>
              {/* <NextIntlClientProvider messages={messages}> */}
              <SiteHeader />
              {children}
              <SiteFooter />
              {/* <Reliverse /> */}
              {hideTailwindIndicator === false && <TailwindScreens />}
              {/* </NextIntlClientProvider> */}
            </ThemeProvider>
          </TRPCReactProvider>
          <Toaster />
          <LoglibAnalytics />
          <VercelAnalytics />
          <SpeedInsights />
        </body>
      </AuthProvider>
    </html>
  );
}
