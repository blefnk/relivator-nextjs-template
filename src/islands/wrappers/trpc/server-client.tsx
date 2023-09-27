/**
 * todo: implement the next things in the feature:
 * @see https://github.com/jherr/trpc-on-the-app-router/issues/3
 * @see https://github.com/amirs18/trpc-on-the-app-router/tree/main
 */

import { inferAsyncReturnType } from "@trpc/server";
import { Session } from "next-auth";

import { appRouter } from "~/data/db/client";
import { createContext } from "~/data/env/context";

export const createServerClient = async (session: Session | null) =>
  appRouter.createCaller(await createContext(session));

export type ServerClient = inferAsyncReturnType<typeof createServerClient>;
