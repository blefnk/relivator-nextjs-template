import { createTRPCRouter, protectedProcedure } from "~/core/trpc-old/trpc";

export const productRouter = createTRPCRouter({
  getProduct: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.products.findMany();
  }),
});
