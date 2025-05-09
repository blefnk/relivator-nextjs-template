// note: run `bun db:auth` to generate the `users.ts`
// schema after making breaking changes to this file

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";
import { polar } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { UserDbType } from "~/lib/auth-types";

import { SYSTEM_CONFIG } from "~/app";
import { db } from "~/db";
import {
  accountTable,
  sessionTable,
  twoFactorTable,
  userTable,
  verificationTable,
} from "~/db/schema";

interface GitHubProfile {
  [key: string]: unknown;
  email?: string;
  name?: string;
}

interface GoogleProfile {
  [key: string]: unknown;
  email?: string;
  family_name?: string;
  given_name?: string;
}

interface SocialProviderConfig {
  [key: string]: unknown;
  clientId: string;
  clientSecret: string;
  mapProfileToUser: (
    profile: GitHubProfile | GoogleProfile,
  ) => Record<string, unknown>;
  redirectURI?: string;
  scope: string[];
}

const hasGithubCredentials =
  process.env.AUTH_GITHUB_ID &&
  process.env.AUTH_GITHUB_SECRET &&
  process.env.AUTH_GITHUB_ID.length > 0 &&
  process.env.AUTH_GITHUB_SECRET.length > 0;

const hasGoogleCredentials =
  process.env.AUTH_GOOGLE_ID &&
  process.env.AUTH_GOOGLE_SECRET &&
  process.env.AUTH_GOOGLE_ID.length > 0 &&
  process.env.AUTH_GOOGLE_SECRET.length > 0;

// Build social providers configuration
const socialProviders: Record<string, SocialProviderConfig> = {};

if (hasGithubCredentials) {
  socialProviders.github = {
    clientId: process.env.AUTH_GITHUB_ID ?? "",
    clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    mapProfileToUser: (profile: GitHubProfile) => {
      let firstName = "";
      let lastName = "";
      if (profile.name) {
        const nameParts = profile.name.split(" ");
        firstName = nameParts[0];
        lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
      }
      return {
        age: null,
        firstName,
        lastName,
      };
    },
    scope: ["user:email", "read:user"],
  };
}

if (hasGoogleCredentials) {
  socialProviders.google = {
    clientId: process.env.AUTH_GOOGLE_ID ?? "",
    clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    mapProfileToUser: (profile: GoogleProfile) => {
      return {
        age: null,
        firstName: profile.given_name ?? "",
        lastName: profile.family_name ?? "",
      };
    },
    scope: ["openid", "email", "profile"],
  };
}

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: (process.env.POLAR_ENVIRONMENT as "production" | "sandbox") || "production",
});

export const auth = betterAuth({
  account: {
    accountLinking: {
      allowDifferentEmails: false,
      enabled: true,
      trustedProviders: Object.keys(socialProviders),
    },
  },
  baseURL: process.env.NEXT_SERVER_APP_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      account: accountTable,
      session: sessionTable,
      twoFactor: twoFactorTable,
      user: userTable,
      verification: verificationTable,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  // Configure OAuth behavior
  oauth: {
    // Default redirect URL after successful login
    defaultCallbackUrl: SYSTEM_CONFIG.redirectAfterSignIn,
    // URL to redirect to on error
    errorCallbackUrl: "/auth/error",
    // Whether to link accounts with the same email
    linkAccountsByEmail: true,
  },

  plugins: [
    twoFactor(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      // Configure checkout
      checkout: {
        enabled: true,
        products: [
          {
            productId: "pro-plan", // Replace with actual product ID from Polar Dashboard
            slug: "pro" // Custom slug for easy reference in Checkout URL
          },
          {
            productId: "premium-plan", // Replace with actual product ID from Polar Dashboard
            slug: "premium" // Custom slug for easy reference in Checkout URL
          }
        ],
        successUrl: "/dashboard/billing?checkout_success=true&checkout_id={CHECKOUT_ID}",
      },
      // Configure webhooks
      webhooks: {
        secret: process.env.POLAR_WEBHOOK_SECRET || "",
        onPayload: async (payload) => {
          console.log("Received webhook payload:", payload.type);
        },
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,

  // Only include social providers if credentials are available
  socialProviders,

  user: {
    additionalFields: {
      age: {
        input: true,
        required: false,
        type: "number",
      },
      firstName: {
        input: true,
        required: false,
        type: "string",
      },
      lastName: {
        input: true,
        required: false,
        type: "string",
      },
    },
  },
});

export const getCurrentUser = async (): Promise<null | UserDbType> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return session.user as UserDbType;
};

export const getCurrentUserOrRedirect = async (
  forbiddenUrl = "/auth/sign-in",
  okUrl = "",
  ignoreForbidden = false,
): Promise<null | UserDbType> => {
  const user = await getCurrentUser();

  // if no user is found
  if (!user) {
    // redirect to forbidden url unless explicitly ignored
    if (!ignoreForbidden) {
      redirect(forbiddenUrl);
    }
    // if ignoring forbidden, return the null user immediately
    // (don't proceed to okUrl check)
    return user; // user is null here
  }

  // if user is found and an okUrl is provided, redirect there
  if (okUrl) {
    redirect(okUrl);
  }

  // if user is found and no okUrl is provided, return the user
  return user; // user is UserDbType here
};
