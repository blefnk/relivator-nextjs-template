import { redirect } from "next/navigation";

import { auth } from "~/server/queries/user";

export default async function ProtectedRoute() {
  const session = await auth();

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
