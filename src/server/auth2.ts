import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { defaultLocale } from "~/i18n/locales";
import { NextAuthOptions, type AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { type Provider } from "next-auth/providers/index";

// import { sendVerificationRequest } from "~/server/request";
import { signInPagePath } from "~/server/utils";
import { db } from "~/data/db/client";
import { env } from "~/data/env/env.mjs";

const providers = [
  /**
   * Auth Email Provider
   * @see https://next-auth.js.org/providers/email
   */
  env.EMAIL_FROM &&
    env.RESEND_API_KEY &&
    EmailProvider({
      from: env.EMAIL_FROM,
      // sendVerificationRequest,
    }),

  /**
   * Google OAuth Provider
   * @see https://next-auth.js.org/providers/google
   */
  env.GOOGLE_CLIENT_ID &&
    env.GOOGLE_CLIENT_SECRET &&
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

  /**
   * Github OAuth Provider
   * @see https://next-auth.js.org/providers/github
   */
  env.GITHUB_CLIENT_ID &&
    env.GITHUB_CLIENT_SECRET &&
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      checks: ["none"],
    }),
].filter(Boolean) as Provider[];

export const authOptions: NextAuthOptions = {
  /**
   * @see https://authjs.dev/reference/adapter/drizzle
   */
  // adapter: DrizzleAdapter(db) as AuthOptions["adapter"],

  /**
   * @see https://next-auth.js.org/providers
   */
  providers,

  /**
   * @see https://next-auth.js.org/configuration/options#pages
   */
  pages: { signIn: signInPagePath(defaultLocale) },

  /**
   * @see https://next-auth.js.org/configuration/options#secret
   */
  secret: env.NEXTAUTH_SECRET,

  /**
   * @see https://next-auth.js.org/configuration/options#session
   */
  session: {
    strategy: "jwt",
  },

  /**
   * The JWT callback is called whenever a JSON Web Token is created (i.e. at
   * sign in) or updated (i.e whenever a session is accessed in the client).
   * The returned value will be encrypted, and it is stored in a cookie.
   *
   * @see https://next-auth.js.org/configuration/callbacks#jwt-callback
   * @see https://next-auth.js.org/configuration/options#callbacks
   */
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.userId = user.id;
  //       token.email = user.email;
  //     }
  //     return Promise.resolve(token);
  //   },
  // },
  debug: process.env.NODE_ENV === "development",
  // debug: true,
};
