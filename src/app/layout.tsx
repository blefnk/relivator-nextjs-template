/**
 * This is just the wrapper for the app.
 * Go to "app/[locale]/layout.tsx" file.
 */

import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relivator Next.js Starter",
  description:
    "Next.js 13 ultimate starter with TypeScript, ESLint, Prettier, Absolute Imports, and more.",
};

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}

// [💡 INTERESTING THINGS SECTION 💡]

//* Even though this component just passes its children, the presence of this file fixes
//* an issue in Next.js 13 when clicking on switch locale would result in full reload.
//? https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts

//* `type` has a more succinct syntax and you only need to pull in an interface when you are trying to do declaration merging or
//* extending an existing interface or library. If you are a library author then this guidance changes to using an interface as
//* your default so that folks using your library can extend the functionality where it makes sense to them. You are not
//* able to create union, intersection, or tuple with an interface so use a `type` when creating them. The choice
//* between `type` and `interface` depends on the specific use case and requirements of your TypeScript project.
//? https://levelup.gitconnected.com/typescript-what-is-the-difference-between-type-and-interface-9085b88ee531
