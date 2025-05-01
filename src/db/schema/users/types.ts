import type { InferSelectModel } from "drizzle-orm";

import type { userTable } from "./tables";

export type User = InferSelectModel<typeof userTable>;
