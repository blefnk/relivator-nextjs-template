import { createTRPCRouter, protectedProcedure } from "~/core/trpc/trpc";

export const productRouter = createTRPCRouter({
  getProduct: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.products.findMany();
  }),
});
