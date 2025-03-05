import type { InferSelectModel } from "drizzle-orm";
import type { userTable } from "./schema";

export type User = InferSelectModel<typeof userTable>;
