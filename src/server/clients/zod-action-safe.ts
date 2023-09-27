/** @see https://github.com/TheEdoRan/next-safe-action/tree/main/packages/next-safe-action */

import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

import { authOptions } from "~/server/auth";
import { ERR } from "~/server/utils";

// todo: rewrite in the better ways for auth.js library

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  buildContext: async () => {
    // can access previous context value
    // const userId = cookies().get("userId");
    const userId = await getServerSession(authOptions());

    // protect action guard
    if (!userId) throw new Error(ERR.unauthenticated);

    // context will be merged with
    // previous context automatically
    return {
      userId,
    };
  },
});
