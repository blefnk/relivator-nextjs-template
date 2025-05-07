import { getCurrentUser } from "~/lib/auth";

import { DashboardPageClient } from "./page.client";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return <DashboardPageClient user={user} />;
}
