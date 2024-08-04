import type { MetadataRoute } from "next";

import { env } from "~/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 0.7,
      url: `${env.NEXT_PUBLIC_APP_URL}/`,
    },
  ];
}
