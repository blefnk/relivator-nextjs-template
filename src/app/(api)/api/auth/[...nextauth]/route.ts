/** @see https://authjs.dev/reference/adapter/drizzle */

import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
