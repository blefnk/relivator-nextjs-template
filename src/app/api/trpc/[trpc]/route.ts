import type { NextRequest } from "next/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "~/core/trpc-old/root";
import { createTRPCContext } from "~/core/trpc-old/trpc";
import { env } from "~/env";

const noop = () => {};

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    createContext: () =>
      createTRPCContext({
        req: request,
      }),
    endpoint: "/api/trpc",
    onError: env.NODE_ENV === "development" ? noop : undefined,
    req: request,
    router: appRouter,
  });

export { handler as POST }; // Learning resources and inspirations// ===================================// @see https://youtu.be/qCLV0Iaq9zU// @see https://github.com/t3-oss/create-t3-app/blob/next/cli/template/extras/src/app/api/trpc/%5Btrpc%5D/route.ts//
