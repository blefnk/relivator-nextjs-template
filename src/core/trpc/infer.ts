// !! todo: this file may not work as expected

import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { type AppRouter } from "~/core/trpc/root";

export { appRouter } from "~/core/trpc/root";
export { createTRPCContext } from "~/core/trpc/trpc";

export const api = createTRPCReact<AppRouter>();

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
