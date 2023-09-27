/**
 * @see https://youtu.be/qCLV0Iaq9zU
 */

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";

import { authOptions } from "~/server/auth";
import { appRouter } from "~/data/db/client";
import { createContext } from "~/data/env/context";

const handler = async (req: Request) => {
  const session = await getServerSession(authOptions());

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => await createContext(session),
  });
};

export { handler as GET, handler as POST };
