// import type {
//   inferAsyncReturnType,
//   inferRouterInputs,
//   inferRouterOutputs,
// } from "@trpc/server";
import type { Session } from "next-auth";

import { createContext } from "~/core/trpc-old/context";
import { todosRouter } from "~/core/trpc-old/routers/todo2";
import { userRouter } from "~/core/trpc-old/routers/trpc-user";

// @ts-expect-error TODO: fix Auth.js
export const appRouter = router({
  todos: todosRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

// Inference helper for inputs.
// @example type HelloInput = RouterInputs['example']['hello']
// export type RouterInputs = inferRouterInputs<AppRouter>;
// Inference helper for outputs.
// @example type HelloOutput = RouterOutputs['example']['hello']
// export type RouterOutputs = inferRouterOutputs<AppRouter>;
export const createServerClient = async (session: null | Session) =>
  appRouter.createCaller(await createContext(session));

export type ServerClient = Awaited<ReturnType<typeof createServerClient>>;

// @see https://github.com/jherr/trpc-on-the-app-router/issues/3
// @see https://github.com/amirs18/trpc-on-the-app-router/tree/main
//
