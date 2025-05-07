import { SYSTEM_CONFIG } from "~/app";
import { getCurrentUserOrRedirect } from "~/lib/auth";

import { SignUpPageClient } from "./page.client";

export default async function SignUpPage() {
  await getCurrentUserOrRedirect(
    undefined,
    SYSTEM_CONFIG.redirectAfterSignIn,
    true,
  );

  return <SignUpPageClient />;
}
