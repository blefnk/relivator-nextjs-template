/**
 * Below is the primary router for the server. All routers
 * added in "/api/routers" should be manually added here.
 */

import { productRouter } from "~/core/trpc/routers/product";
import { todoRouter } from "~/core/trpc/routers/todo";
import { createTRPCRouter, tn } from "~/core/trpc/trpc";

// Export the inner and nested tRPC routers
export const appRouter = createTRPCRouter({
  product: productRouter,
  todo: todoRouter,
  books: tn.router({
    list: tn.procedure.query(() => [
      { id: "0", name: "Store 0", author: null },
      { id: "1", name: "Store 1", author: { id: "1000", name: "Store 1" } },
      { id: "2", name: "Store 2", author: { id: "1001", name: "Store 2" } },
    ]),
    get: tn.procedure.query(() => ({
      id: "1",
      name: "Name 1",
      author: { id: "1000", name: "Store 1" },
    })),
    updateName: tn.procedure.mutation(() => ({
      id: "1",
      name: "Name 1 (Updated)",
    })),
    updateAuthor: tn.procedure.mutation(() => ({
      id: "2",
      author: { id: "1002", name: "Store 3" },
    })),
  }),
});

// Export type definition of the tRPC API
export type AppRouter = typeof appRouter;

/**
 * Learn more and inspirations
 * ===========================
 * @see https://github.com/klis87/normy/blob/master/examples/trpc/src/server.ts
 * @see https://github.com/openstatusHQ/openstatus/blob/main/packages/api/src/lambda.ts
 * @see https://github.com/openstatusHQ/openstatus/blob/main/packages/api/src/router/clerk/webhook.ts
 */
