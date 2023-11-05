/**
 * @see https://github.com/openstatusHQ/openstatus/blob/main/packages/api/src/lambda.ts
 * @see https://github.com/openstatusHQ/openstatus/blob/main/packages/api/src/router/clerk/webhook.ts
 */

import { productRouter } from "~/utils/trpc/routers/product";
import { todoRouter } from "~/utils/trpc/routers/todo";
import { createTRPCRouter } from "~/utils/trpc/trpc";

/**
 * This is the primary router for your server. All routers
 * added in "/api/routers" should be manually added here.
 */
// todo: implement / unfinished
export const appRouter = createTRPCRouter({
  // clerkRouter: clerkRouter,
  // stripeRouter: stripeRouter,
  product: productRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
