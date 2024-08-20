import { redirect } from "next/navigation";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";

export default async function ProtectedRoute() {
  const session = authProvider === "clerk" ? await clerk() : await authjs();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      This is a protected route.
      <br />
      You will only see this if you are authenticated.
    </div>
  );
}
