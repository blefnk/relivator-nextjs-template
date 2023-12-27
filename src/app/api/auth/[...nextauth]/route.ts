import NextAuth from "next-auth";

import { authOptions } from "~/core/auth/authjs";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
