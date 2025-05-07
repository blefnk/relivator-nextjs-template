import { redirect } from "next/navigation";

import { SYSTEM_CONFIG } from "~/app";

export default function DashboardPage() {
  return redirect(SYSTEM_CONFIG.redirectAfterSignIn);
}
