import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/utils/trpc/trpc";

export const productRouter = createTRPCRouter({
  getProduct: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.products.findMany();
  }),
});
