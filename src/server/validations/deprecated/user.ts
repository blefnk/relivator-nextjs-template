import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().min(5).email(),
});
