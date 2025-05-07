import type { InferSelectModel } from "drizzle-orm";

import type { sessionTable, userTable } from "./tables";

export type Session = InferSelectModel<typeof sessionTable>;
export type User = InferSelectModel<typeof userTable>;
