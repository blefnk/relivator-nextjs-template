"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

// TODO: place all other analytics services here with
// TODO: options to turn them on/off in layout.tsx
export function Analytics() {
  return <GoogleAnalytics trackPageViews />;
}
