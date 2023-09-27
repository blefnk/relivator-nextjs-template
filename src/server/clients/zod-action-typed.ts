/** @see https://github.com/demestoss/next-typed-action */

import { cookies } from "next/headers";
import { typedServerActionClient } from "next-typed-action";

import { ERR } from "~/server/utils";

// todo: rewrite in the better ways for auth.js library

export const actionClient = typedServerActionClient();

export const authActionClient = actionClient.use(() => {
  // can access previous context value
  const userId = cookies().get("userId");

  // protect action guard
  if (!userId) {
    throw new Error(ERR.unauthenticated);
  }

  // context will be merged with
  // previous context automatically
  return {
    userId,
  };
});
