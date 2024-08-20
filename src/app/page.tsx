import { redirect } from "next/navigation";

// This page only renders when the app
// is built statically (output: "export")
export default function RootPage() {
  redirect("/en");
}

// Extended implementation
// (possibly will be deprecated):
// Redirects to ./[locale]/page.tsx
// export default function RootPage() {
//   if (defaultLocale) {
//     return redirect(defaultLocale);
//   }
//   return <>Root</>;
// }
