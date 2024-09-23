import * as z from "zod";

export const ogImageSchema = z.object({
  description: z.string().optional(),
  mode: z.enum(["light", "dark"]).default("dark"),
  title: z.string(),
  type: z.string().optional(),
});
