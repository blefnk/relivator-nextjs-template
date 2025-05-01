import type { InferSelectModel } from "drizzle-orm";
import type { userTable } from "..";

export type User = InferSelectModel<typeof userTable>;
