import { z } from "zod";

export const addToDoInputSchema = z.object({ title: z.string().min(1) });

export type AddToDoInputData = z.infer<typeof addToDoInputSchema>;
