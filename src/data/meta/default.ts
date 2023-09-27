import { type Metadata } from "next";
import { siteConfig } from "~/app";

import { fullURL } from "~/data/meta/builder";

export const DEFAULT_METADATA: Metadata = {
  metadataBase: fullURL(),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    url: "/",
    siteName: siteConfig.name,
    locale: "en-US",
    type: "website",
  },
  twitter: {
    creator: siteConfig.company.twitter,
    site: siteConfig.handles.twitter,
    card: "summary_large_image",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c026d3" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
