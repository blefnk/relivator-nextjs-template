import { getCurrentUser } from "~/lib/auth";

import { BillingPageClient } from "./page.client";

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <BillingPageClient user={user} />;
}
