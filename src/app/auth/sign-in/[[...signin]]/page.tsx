import { SYSTEM_CONFIG } from "~/app";
import { getCurrentUserOrRedirect } from "~/lib/auth";

import { SignInPageClient } from "./page.client";

export default async function SignInPage() {
  await getCurrentUserOrRedirect(
    undefined,
    SYSTEM_CONFIG.redirectAfterSignIn,
    true,
  );

  return <SignInPageClient />;
}
