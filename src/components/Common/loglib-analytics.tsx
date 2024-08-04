import Loglib from "@loglib/tracker/react";

import { env } from "~/env";

export function LoglibAnalytics() {
  if (!env.LOGLIB_ID) {
    return null;
  }

  return (
    <Loglib
      config={{
        id: env.LOGLIB_ID,
      }}
    />
  );
}
