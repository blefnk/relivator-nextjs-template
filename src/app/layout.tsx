import type { ReactNode } from "react";

// TODO: @reliverse/themes (coming soon)
// import "@radix-ui/themes/styles.css"; // import "@xyflow/react/dist/style.css";
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import "../styles/globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout
// file is required, even if it's just passing children through.
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}

// Extended implementation (possibly will be deprecated):
// import { defaultLocale } from "~/../reliverse.i18n";
// This is the root layout component that wraps the entire application
// Please navigate to src/app/layout.tsx to see inner main app layout
// Displays ./page.tsx
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: ReactNode;
// }>) {
//   if (defaultLocale) {
//     return children;
//   }
//   return (
//     <html lang="en">
//       <body>
//         <main>{children}</main>
//       </body>
//     </html>
//   );
// }
