/**
 * This is the handler page for the user authentication.
 * This page acts as middleware to verify user sessions and handles
 * cases where user data might be absent due to possible database updates.
 */
import { notFound, redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { getNextAuthServerSession } from "~/auth";
import { env } from "~/env.mjs";
import { redirect as intlRedirect } from "~/navigation";
import { eq } from "drizzle-orm";

import { db } from "~/data/db";
import { User, users } from "~/data/db/schema";
import { createUser } from "~/utils/trpc/others/handlers/users";
import { getServerAuthSession, getUserData, getUserEmail } from "~/utils/users";

export default async function SignInPage() {
  // Initialize debug mode for this request for logging
  const debug = process.env.NODE_ENV === "development";
  // Attempt to retrieve the user session
  const session = await getServerAuthSession();
  // Handle the case if no session is found
  if (!session) {
    if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
      return intlRedirect("/sign-in");
    } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
      return redirect("/api/auth/signin");
    } else {
      throw new Error("❌ NEXT_PUBLIC_AUTH_PROVIDER is not defined");
    }
  }

  const data = await getUserData(session);
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.id))
    .then((res: User[]) => res[0] ?? null);

  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
    const current_clerk_user = await currentUser();
    const email = getUserEmail(current_clerk_user);
    const name = data.username;
    const image = data.image;
    const { userId } = auth();

    if (!user && userId) {
      const create = await createUser({
        id: userId,
        name: name,
        emailClerk: email,
        emailVerified: new Date(),
        image: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (create) console.log(" ✓ New user successfully registered:", name);
    } else if (user && userId) {
      const updateFields: Record<string, any> = {};

      // Using a functional approach to set fields
      const setFieldIfNull = (fieldName: string, newValue: any) => {
        if (user[fieldName] === null) {
          updateFields[fieldName] = newValue;
        }
      };

      // Check each field and add to updateFields if it's null
      setFieldIfNull("name", name);
      setFieldIfNull("emailClerk", email);
      setFieldIfNull("emailVerified", new Date()); // temporary

      // Update the user if there are fields to update
      if (Object.keys(updateFields).length > 0) {
        // Set updatedAt to the current date/time
        updateFields.updatedAt = new Date();

        await db
          .update(users)
          .set(updateFields)
          .where(eq(users.id, session.id));

        if (debug) {
          console.log(
            " ✓ Some of the user's data was null and is now updated.",
          );
        }
      }
    }

    // User prepared, redirect to the app
    return redirect("/dashboard/stores");
  } else if (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs") {
    const session = await getNextAuthServerSession();

    if (user && session?.user?.id && !user.emailVerified) {
      console.log(" ✓ New user successfully registered.");
    }

    if (user && session?.user?.id) {
      const updateFields: Record<string, any> = {};

      // Using a functional approach to set fields
      const setFieldIfNull = (fieldName: string, newValue: any) => {
        if (user[fieldName] === null) {
          updateFields[fieldName] = newValue;
        }
      };

      // Check each field and add to updateFields if it's null
      setFieldIfNull("emailVerified", new Date()); // temporary

      // Update the user if there are fields to update
      if (Object.keys(updateFields).length > 0) {
        // Set updatedAt to the current date/time
        updateFields.updatedAt = new Date();

        await db
          .update(users)
          .set(updateFields)
          .where(eq(users.id, session.user.id));

        // if (debug) {
        //   console.log(
        //     " ✓ Some of the user's data was null and is now updated.",
        //   );
        // }
      }
    }

    // User prepared, redirect to the app
    return redirect("/dashboard/stores");
  } else {
    throw new Error("❌ NEXT_PUBLIC_AUTH_PROVIDER is not defined");
  }
}
