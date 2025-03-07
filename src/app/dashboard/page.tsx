import { headers } from "next/headers";
import type { User } from "~/db/types";
import { auth } from "~/lib/auth";
import { DashboardPageClient } from "./client";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <DashboardPageClient user={session?.user as User | null} />;
}
