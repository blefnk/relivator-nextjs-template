import type { HTMLAttributeAnchorTarget } from "react";

export type FooterItem = {
  items: {
    external?: boolean;
    href: string;
    title: string;
  }[];
  title: string;
};

type FooterConfig = {
  link: string;
  text: string;
};

type SocialConfig = {
  alt?: string;
  icon: string;
  link: string;
};

export type NavigationKeys = "about" | "blog" | "docs" | "download" | "learn";

export type NavigationEntry = {
  items?: Record<string, NavigationEntry>;
  label?: string;
  link?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

export type SiteNavigation = {
  footerLinks: FooterConfig[];
  sideNavigation: Record<NavigationKeys, NavigationEntry>;
  socialLinks: SocialConfig[];
  topNavigation: Record<NavigationKeys, NavigationEntry>;
};
