/**
 * @see https://github.com/jherr/trpc-on-the-app-router/issues/3
 * @see https://github.com/amirs18/trpc-on-the-app-router/tree/main
 */

import { inferAsyncReturnType, inferRouterOutputs } from "@trpc/server";
import { Session } from "next-auth";

import { createContext } from "~/utils/trpc/others/context";
import { todosRouter } from "~/utils/trpc/others/routers/todos";
import { userRouter } from "~/utils/trpc/others/routers/users";
import { router } from "~/utils/trpc/others/trpc";

export const appRouter = router({
  user: userRouter,
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const createServerClient = async (session: Session | null) =>
  appRouter.createCaller(await createContext(session));

export type ServerClient = inferAsyncReturnType<typeof createServerClient>;
