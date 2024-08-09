import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/core/trpc-old/trpc";

export const authRouter = createTRPCRouter({
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in auth.ts file
    return "you can see this secret message!";
  }),
  getSession: publicProcedure.query(({ ctx }) => ctx.session),
});
