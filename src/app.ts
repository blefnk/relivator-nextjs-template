//? To reduce the number of config files, we aim to combine everything into a single file.
//? Materials about @satisfies: https://youtu.be/49gHWuepxxE, https://youtu.be/G1RtAmI0-vc

import { networks } from "~/utils/server/appts/socials";
import { Config, HeroHeader, ContentSection } from "~/utils/types/appts";

// ===================================================================================== //

export const REPOSITORY_OWNER = "blefnk";
export const REPOSITORY_NAME = "relivator";
export const REPOSITORY_URL = `https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`;

// ===================================================================================== //

export const appts = {
  name: "Relivator",
  social: networks({
    youtube: "@bleverse_com",
    discord: "Pb8uKbwpsJ",
    facebook: "groups/bleverse",
    twitter: "bleverse_com",
    github: "blefnk",
  }),
} satisfies Config;

export default appts;

// ===================================================================================== //

const baseUrl = "https://relivator.bleverse.com";

export const settings = {
  themeToggleEnabled: true,
};

export const siteConfig = {
  name: "Relivator",
  author: "Bleverse",
  description:
    "Easy to setup, customizable, quick, and responsive Next.js website starter.",
  keywords: [
    "blefonix",
    "bleverse",
    "landing page",
    "next.js",
    "nextjs",
    "radix ui",
    "react",
    "react",
    "relivator",
    "shadcn/ui",
    "starter",
    "tailwind css",
    "template",
    "tools",
  ],
  url: {
    base: baseUrl,
    author: "https://bleverse.com",
  },
  ogImage: `${baseUrl}/og-image.png`,
};

export const contactConfig = {
  email: "blefnk@gmail.com",
};

// ===================================================================================== //

export const heroHeader: HeroHeader = {
  header: `Next.js Apps Made Easy`,
  subheader: `Easy to setup. Customizable. Quick. Responsive.`,
  // image: `/hero-img.webp`,
};

export const featureCards: ContentSection = {
  header: `Powered by`,
  subheader: `What Makes Relivator Possible`,
  content: [
    {
      text: `Next.js`,
      subtext: `The React Framework`,
      // image: `/next.svg`,
    },
    {
      text: `shadcn/ui`,
      subtext: `Beautifully Designed Components`,
      // image: `/shadcn.svg`,
    },
    {
      text: `Vercel`,
      subtext: `Develop. Preview. Ship.`,
      // image: `/vercel.svg`,
    },
  ],
};

export const features: ContentSection = {
  header: `Features`,
  subheader: `Why You Need to Download Relivator`,
  // image: `/features-img.webp`,
  content: [
    {
      text: `SEO Optimized`,
      subtext: `Improved website visibility on search engines`,
      image: `/seo.svg`,
    },
    {
      text: `Highly Performant`,
      subtext: `Fast loading times and smooth performance`,
      image: `/performant.svg`,
    },
    {
      text: `Easy Customizability`,
      subtext: `Change your content and layout with little effort`,
      image: `/customize.svg`,
    },
  ],
};
