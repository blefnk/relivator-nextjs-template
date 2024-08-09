// YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
// 1. You want to modify request context (see Part 1).
// 2. You want to create a new middleware or type of procedure (see Part 3).
import type { NextRequest } from "next/server";

// need to use are documented accordingly near the end.
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

// TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
import type { Context } from "~/core/trpc-old/context";

import { authjs } from "~/auth/authjs";
import { db } from "~/db";

// 1. CONTEXT
// This section defines the "contexts" that are available in the backend API.
// These allow you to access things when processing a request, like the database, the session, etc.
type CreateContextOptions = {
  headers: Headers;
};

// This helper generates the "internals" for a tRPC context. If you need to use it, you can export
// it from here.
// Examples of things you may need it for:
// - testing, so we don't have to mock Next.js' req/res
// - tRPC's `createSSGHelpers`, where we don't have req/res
// @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
export const createInnerTRPCContext = async (options: CreateContextOptions) => {
  const session = await authjs();

  return {
    db,
    headers: options.headers,
    session,
  };
};

// This is the actual context you'll use in the router. It will be used to
// process every request that goes through the tRPC endpoint
// @see https://trpc.io/docs/context
export const createTRPCContext = async (options: {
  req: NextRequest;
}) => {
  // Fetch stuff that depends on the request
  return await createInnerTRPCContext({
    headers: options.req.headers,
  });
};

// 2. INITIALIZATION
// This is where the tRPC API is initialized, connecting the context and transformer. We also parse
// ZodErrors so that you get type-safety on the frontend if the procedure fails due to validation
// errors on the backend.
const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
  transformer: superjson,
});

// Initialize tRPC to be used as inner nested
export const tn = initTRPC.context<Context>().create();

// 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
// These are the pieces you use to build the tRPC API. You should import these a lot in the
// "/src/server/api/routers" directory.
//
// This is how you create new routers and sub-routers in the tRPC API.
// @see https://trpc.io/docs/router
export const createTRPCRouter = t.router;

// Public (unauthenticated) procedure
// This is the base piece you use to build new queries and mutations on the tRPC API. It does not
// guarantee that a user querying is authorized, but you can still access user session data if they
// are logged in.
export const publicProcedure = t.procedure;

// Reusable middleware that enforces users are logged in before running the procedure.
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  // consola.info({ input }); // to debug
  if (!ctx.session?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {
        ...ctx.session,
        user: ctx.session.id,
      },
    },
  });
});

// Protected (authenticated) procedure
// If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
// the session is valid and guarantees `ctx.session` is not null.
// @see https://trpc.io/docs/procedures
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
