import { redirect } from "next/navigation";

import { env } from "~/env";

export default function AuthRootPage() {
  // TODO: FIX revalidateUser();
  // return redirect(
  //   env.NODE_ENV === "development" ? "/dashboard" : "/dashboard/billing",
  // );
  return redirect(
    env.NODE_ENV === "development" ? "/error?message=session-not-found" : "/",
  );
}
