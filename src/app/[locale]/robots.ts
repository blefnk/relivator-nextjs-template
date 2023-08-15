import { MetadataRoute } from "next";

import { BASE_URL } from "~/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
      // disallow: "/private/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
