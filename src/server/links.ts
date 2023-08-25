import type { Route } from "next";
import { REPOSITORY_URL } from "~/app";

export const navItems = {
  mainNav: [
    {
      id: "tools",
      title: "Features",
      href: `/` as Route,
      external: false
    },
    {
      id: "about",
      title: "About",
      href: "/about",
      external: false
    },
    {
      id: "github",
      title: "Github",
      href: REPOSITORY_URL,
      external: true
    },
    {
      id: "twitter",
      title: "X",
      href: "https://x.com/bleverse_com",
      external: true
    }
  ],
  sidebarNav: [
    {
      id: "tools",
      title: "Features",
      items: [
        {
          id: "todo",
          title: "Todo List",
          href: "/features/todo",
          items: []
        }
      ]
    }
  ]
} as const;

export const navLinks = [
  {
    route: "Home",
    path: `/` as Route
  },
  {
    route: "Features",
    path: "/#features"
  },
  {
    route: "Contact",
    path: "/contact"
  },
  {
    route: "Github",
    path: "https://github.com/blefnk/relivator"
  }
];
