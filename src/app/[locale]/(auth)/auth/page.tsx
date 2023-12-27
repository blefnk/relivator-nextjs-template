/**
 * This is the handler page for the user authentication.
 * This page acts as middleware to verify user sessions and handles
 * cases where user data might be absent due to possible database updates.
 */
import { notFound } from "next/navigation";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { type UserRole } from "~/types";
import { eq } from "drizzle-orm";
import { getProviders } from "next-auth/react";
import toast from "react-hot-toast";
import type Stripe from "stripe";

import { getNextAuthServerSession } from "~/core/auth/authjs";
import { getSubscriptionPlanAction } from "~/core/stripe/actions";
import { stripe } from "~/core/stripe/connect";
import { createUser } from "~/core/trpc/routers/auth3";
import { db } from "~/data/db";
import { users, type User } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { redirect } from "~/navigation";
import { utapi } from "~/server/utapi";
import {
  getCurrentUser,
  getServerAuthSession,
  getUserData,
  getUserEmail,
} from "~/utils/auth/users";

export default async function SignInPage() {
  const debug = process.env.NODE_ENV === "development";

  // ==============================================
  // HANDLE USER AUTH: CLERK
  // ==============================================
  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
    // Attempt to retrieve the user session
    const session = await getServerAuthSession();

    // Handle the case if no session is found
    if (!session) {
      return redirect("/sign-in");
    }

    const data = await getUserData(session);
    const user: User = await db
      .select()
      .from(users)
      .where(eq(users.id, session.id))
      .then((res: User[]) => res[0] ?? null);

    // const user = await getCurrentUser();

    const { userId } = auth();

    // todo: determine which approach is better
    const current_clerk_user = await currentUser();
    const get_clerk_user = await clerkClient.users.getUser(
      userId ?? session.id,
    );

    const email = getUserEmail(current_clerk_user);
    const name = data.username;
    const image = data.image;

    // If we have a new database, but user already has
    // Stripe metadata we need to get thats data here.
    // Thanks to it user don't loose the subscription.
    // Retrieve the subscription details from Stripe.
    const userPlanInfo = await getSubscriptionPlanAction(userId ?? session.id);

    // Create user in db if they already doesn't exist there
    if (!user && userId) {
      const create = await createUser({
        id: userId,
        // clerkId: userId, // todo: implement to have a single row for authjs and clerk
        name: name,
        emailClerk: email,
        emailVerified: new Date(),
        image: image,
        role: "user",
        mode: "buyer",
        stripeCurrentPeriodEnd: userPlanInfo?.stripeCurrentPeriodEnd ?? null,
        stripeCustomerId: userPlanInfo?.stripeCustomerId ?? null,
        stripePriceId: userPlanInfo?.stripePriceId ?? null,
        stripeSubscriptionId: userPlanInfo?.stripeSubscriptionId ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (create) console.log(" ✓ New user successfully registered:", name);
    }
    if (user && userId) {
      // Edit Clerk's own privateMetadata to add the user's role if it's missing
      if (!get_clerk_user.privateMetadata.role) {
        await clerkClient.users.updateUserMetadata(userId ?? session.id, {
          privateMetadata: {
            role: "user" satisfies UserRole,
          },
        });
      }

      // Using a functional approach to set fields
      const updateFields: Record<string, any> = {};
      const setFieldIfNull = (fieldName: string, newValue: any) => {
        if (user[fieldName] === null) {
          updateFields[fieldName] = newValue;
        }
      };

      // Check each field and add to updateFields if it's null
      setFieldIfNull("name", name);
      setFieldIfNull("emailClerk", email);
      setFieldIfNull("emailVerified", new Date()); // temporary
      setFieldIfNull("image", image);
      setFieldIfNull("role", "user");
      setFieldIfNull("mode", "buyer");
      setFieldIfNull(
        "stripeCurrentPeriodEnd",
        userPlanInfo?.stripeCurrentPeriodEnd ?? null,
      );
      setFieldIfNull(
        "stripeCustomerId",
        userPlanInfo?.stripeCustomerId ?? null,
      );
      setFieldIfNull("stripePriceId", userPlanInfo?.stripePriceId ?? null);
      setFieldIfNull(
        "stripeSubscriptionId",
        userPlanInfo?.stripeSubscriptionId ?? null,
      );

      // Update the user if there are fields to update
      if (Object.keys(updateFields).length > 0) {
        // Set updatedAt to the current date/time
        updateFields.updatedAt = new Date();

        await db
          .update(users)
          .set(updateFields)
          .where(eq(users.id, session.id));

        if (debug) {
          console.log(" ✓ Some of the user's data was updated");
        }
      }
    }

    // User prepared, redirect to the app
    return redirect("/dashboard/billing");
  }

  // ==============================================
  // HANDLE USER AUTH: NEXT-AUTH.JS
  // ==============================================
  else {
    // Attempt to retrieve the user session
    const session = await getNextAuthServerSession();

    // Handle the case if no session is found
    if (!session) {
      const NextAuthProviders = await getProviders();
      if (!NextAuthProviders) {
        console.error(
          "❌ Specify at least one NextAuth.js provider or switch to Clerk (refer to .env.example)",
        );
        return redirect("/");
      }
      return redirect("/sign-in");
    } else if (session) {
      const data = await getUserData(session);
      const user: User = await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id))
        .then((res: User[]) => res[0] ?? null);

      const oldImageUrl = data.image ?? "";

      if (user && !user.emailVerified) {
        // todo: Trying to fix a strange "A resource is blocked by OpaqueResponseBlocking"
        // todo: error in browser console; We use a new generated image instead; We cannot
        // todo: re-upload original image because UploadThing need to downloaded it first.
        // todo: Note: This error happens only when NEXT_PUBLIC_CSP_XSS is set to "true".
        if (
          env.UPLOADTHING_SECRET &&
          env.NEXT_PUBLIC_CSP_XSS === "true" &&
          oldImageUrl.includes("googleusercontent.com")
        ) {
          // const newImage = await utapi.uploadFilesFromUrl(new URL(oldImageUrl));
          // https://docs.uploadthing.com/api-reference/server#uploadfilesfromurl
          const uploadedImg = await utapi.uploadFilesFromUrl(
            new URL(
              `https://api.dicebear.com/7.x/lorelei/svg?seed=${session?.user?.id}`,
            ),
          );
          const newImageUrl = new URL(uploadedImg.data?.url ?? "");
          await db
            .update(users)
            .set({ image: newImageUrl })
            .where(eq(users.id, session.user.id));
        }
        console.log(" ✓ New user successfully registered");
      }

      // Using a functional approach to set fields
      const updateFields: Record<string, any> = {};
      // eslint-disable-next-line sonarjs/no-identical-functions
      const setFieldIfNull = (fieldName: string, newValue: any) => {
        if (user[fieldName] === null) {
          updateFields[fieldName] = newValue;
        }
      };

      // Check each field and add to updateFields if it's null
      setFieldIfNull("emailVerified", new Date()); // temporary
      setFieldIfNull("role", "user");
      setFieldIfNull("mode", "buyer");

      // If we have a new database, but user already has
      // Stripe metadata we need to get thats data here.
      // Thanks to it user don't loose the subscription.
      // Retrieve the subscription details from Stripe.
      // todo: Current implementation did not work with NextAuth.js
      const userPlanInfo = await getSubscriptionPlanAction(user.id);
      setFieldIfNull(
        "stripeCurrentPeriodEnd",
        userPlanInfo?.stripeCurrentPeriodEnd ?? null,
      );
      setFieldIfNull(
        "stripeCustomerId",
        userPlanInfo?.stripeCustomerId ?? null,
      );
      setFieldIfNull("stripePriceId", userPlanInfo?.stripePriceId ?? null);
      setFieldIfNull(
        "stripeSubscriptionId",
        userPlanInfo?.stripeSubscriptionId ?? null,
      );

      // Update the user if there are fields to update
      if (Object.keys(updateFields).length > 0) {
        // Set updatedAt to the current date/time
        updateFields.updatedAt = new Date();
        await db
          .update(users)
          .set(updateFields)
          .where(eq(users.id, session.user.id));
      }

      // todo: the same as above, just to ensure
      // todo: check for already registered users
      if (
        env.UPLOADTHING_SECRET &&
        env.NEXT_PUBLIC_CSP_XSS === "true" &&
        oldImageUrl.includes("googleusercontent.com")
      ) {
        const uploadedImg = await utapi.uploadFilesFromUrl(
          new URL(
            `https://api.dicebear.com/7.x/shapes/svg?seed=${session?.user?.id}`,
          ),
        );
        const newImageUrl = new URL(uploadedImg.data?.url ?? "");
        await db
          .update(users)
          .set({ image: newImageUrl })
          .where(eq(users.id, session.user.id));
      }

      if (
        debug &&
        ((oldImageUrl.includes("googleusercontent.com") &&
          env.NEXT_PUBLIC_CSP_XSS === "true") ||
          Object.keys(updateFields).length > 0)
      ) {
        console.log(" ✓ Some of the user's data was updated");
      }

      // User prepared, redirect to the app
      return redirect("/dashboard/billing");
    } else {
      console.error("❌ Something wrong with auth/page.tsx");
      return redirect("/");
    }
  }
}
