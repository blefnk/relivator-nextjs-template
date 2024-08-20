import { NextResponse } from "next/server";

import { handler } from "@/server/reliverse/handler";

type ResponseData = {
  pong: string;
};

// This variable is automatically set by
// Vercel during the deployment process.
// eslint-disable-next-line no-restricted-properties
const gitSha = process.env.VERCEL_GIT_COMMIT_SHA || "local";

export const GET = handler<ResponseData, NextResponse>(() => {
  //
  // Health-check API endpoint which returns with success if
  // server is healthy, and responds with the latest git sha.
  //
  return NextResponse.json({
    data: {
      pong: gitSha.substring(0, 7),
    },
    ok: true,
  });
});
