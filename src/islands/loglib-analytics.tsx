import Loglib from "@loglib/tracker/react";

import { env } from "~/env.mjs";

export default function LoglibAnalytics() {
  if (!env.LOGLIB_SITE_ID) return null;

  return (
    <Loglib
      config={{
        id: env.LOGLIB_SITE_ID,
      }}
    />
  );
}
