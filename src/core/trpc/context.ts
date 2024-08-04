import type { inferAsyncReturnType } from "@trpc/server";
import type { Session } from "next-auth";

// Create the context for incoming request.
// TODO: Add Clerk
// @see https://trpc.io/docs/server/context
export function createContext(session: null | Session) {
  return {
    user: session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
