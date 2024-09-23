import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
export const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
