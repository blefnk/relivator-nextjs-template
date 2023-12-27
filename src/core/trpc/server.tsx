import type {
  inferAsyncReturnType,
  inferRouterInputs,
  inferRouterOutputs,
} from "@trpc/server";
import type { Session } from "next-auth";
import superjson from "superjson";

import { createContext } from "~/core/trpc/context";
import { userRouter } from "~/core/trpc/routers/auth2";
import { todosRouter } from "~/core/trpc/routers/todo2";
import { router } from "~/core/trpc/trpc2";

export const appRouter = router({
  user: userRouter,
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const createServerClient = async (session: Session | null) =>
  appRouter.createCaller(await createContext(session));

export type ServerClient = inferAsyncReturnType<typeof createServerClient>;

/**
 * @see https://github.com/jherr/trpc-on-the-app-router/issues/3
 * @see https://github.com/amirs18/trpc-on-the-app-router/tree/main
 */
