import { protectedAction } from "@/server/reliverse/trpc";
import { z } from "zod";

export const createPost = protectedAction
  .input(
    z.object({
      title: z.string(),
    }),
  )
  .mutation(async () => {
    // TODO: implement the input
  });
