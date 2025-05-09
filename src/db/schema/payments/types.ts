import type { InferSelectModel } from "drizzle-orm";

import type { polarCustomerTable, polarSubscriptionTable } from "./tables";

export type PolarCustomer = InferSelectModel<typeof polarCustomerTable>;
export type PolarSubscription = InferSelectModel<typeof polarSubscriptionTable>;
