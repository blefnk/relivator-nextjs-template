import { ClerkProvider } from "@clerk/nextjs";

import { getNextAuthServerSession } from "~/core/auth/authjs";
import { env } from "~/env.mjs";
import NextAuthProvider from "~/islands/providers/session-provider";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // todo: do not require next-auth for clerk auth
  // Retrieve auth session state for authjs request
  const session = await getNextAuthServerSession();
  // Conditionally render wrapper based on provider
  if (
    env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" &&
    env.CLERK_SECRET_KEY !== null &&
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== null
  ) {
    return (
      <NextAuthProvider session={session}>
        <ClerkProvider>{children}</ClerkProvider>
      </NextAuthProvider>
    );
  } else {
    return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
  }
}
