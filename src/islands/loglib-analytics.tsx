import Loglib from "@loglib/tracker/react";

import { env } from "~/data/env/env.mjs";

export const loglibSiteId = env.LOGLIB_SITE_ID || "";
export const loglibApiKey = env.LOGLIB_API_KEY || "";

export default function LoglibAnalytics() {
  return (
    <Loglib
      config={{
        id: loglibSiteId,
      }}
    />
  );
}
