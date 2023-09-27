/** @see https://robotstxt.org/robotstxt.html */

import { MetadataRoute } from "next";
import { BASE_URL } from "~/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
