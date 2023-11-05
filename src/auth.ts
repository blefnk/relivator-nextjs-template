/**
 * @see https://github.com/jherr/app-router-auth-using-next-auth
 * @see https://github.com/rexfordessilfie/next-auth-account-linking
 * @see https://github.com/t3-oss/create-t3-app/blob/next/cli/template/extras/src/server/auth-app/with-drizzle.ts
 * @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/auth/index.ts
 */

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "~/env.mjs";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { type Provider } from "next-auth/providers/index";

import { db } from "~/data/db";
import { mysqlTable } from "~/data/db/schema/mysql";
import { pgTable } from "~/data/db/schema/pgsql";

// Choose the appropriate table based on the provider
let table;
if (env.DATABASE_URL.startsWith("postgres://")) table = pgTable;
else if (env.DATABASE_URL.startsWith("mysql://")) table = mysqlTable;
else throw new Error("Invalid DATABASE_URL");

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the
 * `session` object and keep type safety.
 *
 * Returned by useSession, getSession and received
 * as a prop on the SessionProvider React Context
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
  // interface User {
  //   ...other properties
  //   role: UserRole;
  // }
}

/**
 * Auth.js Providers
 *
 * @see https://next-auth.js.org/providers/discord
 * @see https://next-auth.js.org/providers/github
 * @see https://next-auth.js.org/providers/google
 */
const providers = [
  env.DISCORD_CLIENT_ID &&
    env.DISCORD_CLIENT_SECRET &&
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  env.GITHUB_CLIENT_ID &&
    env.GITHUB_CLIENT_SECRET &&
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  env.GOOGLE_CLIENT_ID &&
    env.GOOGLE_CLIENT_SECRET &&
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  /**
   * ...add more authjs providers here
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
].filter(Boolean) as Provider[];

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/providers
 * @see https://authjs.dev/reference/adapter/drizzle
 * @see https://next-auth.js.org/configuration/options
 * @see https://next-auth.js.org/configuration/callbacks
 */
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, table),
  secret: env.NEXTAUTH_SECRET,
  providers,
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    newUser: "/auth",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getNextAuthServerSession = () => getServerSession(authOptions);
