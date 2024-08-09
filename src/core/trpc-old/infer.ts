// !! todo: deprecated and will be removed in 1.3.x
import { createTRPCReact } from "@trpc/react-query";

// import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/core/trpc-old/root";

export { appRouter } from "~/core/trpc-old/root";

export { createTRPCContext } from "~/core/trpc-old/trpc";

export const api = createTRPCReact<AppRouter>();

// Inference helpers for input types
// @example type HelloInput = RouterInputs['example']['hello']
// export type RouterInputs = inferRouterInputs<AppRouter>;
// Inference helpers for output types
// @example type HelloOutput = RouterOutputs['example']['hello']
// export type RouterOutputs = inferRouterOutputs<AppRouter>;
