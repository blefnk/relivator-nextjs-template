import { productRouter } from "~/core/trpc-old/routers/product";
import { todoRouter } from "~/core/trpc-old/routers/todo";
import { createTRPCRouter, tn } from "~/core/trpc-old/trpc";

// Export the inner and nested tRPC routers
export const appRouter = createTRPCRouter({
  books: tn.router({
    get: tn.procedure.query(() => ({
      id: "1",
      name: "Name 1",
      author: {
        id: "1000",
        name: "Store 1",
      },
    })),
    list: tn.procedure.query(() => [
      {
        id: "0",
        name: "Store 0",
        author: null,
      },
      {
        id: "1",
        name: "Store 1",
        author: {
          id: "1000",
          name: "Store 1",
        },
      },
      {
        id: "2",
        name: "Store 2",
        author: {
          id: "1001",
          name: "Store 2",
        },
      },
    ]),
    updateAuthor: tn.procedure.mutation(() => ({
      id: "2",
      author: {
        id: "1002",
        name: "Store 3",
      },
    })),
    updateName: tn.procedure.mutation(() => ({
      id: "1",
      name: "Name 1 (Updated)",
    })),
  }),
  product: productRouter,
  todo: todoRouter,
});

// Export type definition of the tRPC API
export type AppRouter = typeof appRouter;
