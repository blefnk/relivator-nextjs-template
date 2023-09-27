/**
 * @see https://github.com/jherr/app-router-auth-using-next-auth
 * @see https://github.com/rexfordessilfie/next-auth-account-linking
 */

import { NextRequest } from "next/server";
import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

type RouteHandlerContext = {
  params: { nextauth: string[] };
};

const handler = (req: NextRequest, context: RouteHandlerContext) => {
  return NextAuth(req, context, authOptions());
};

export { handler as GET, handler as POST };
