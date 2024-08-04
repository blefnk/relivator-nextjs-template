import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers/index";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { db } from "~/db";
import { env } from "~/env";

// 🔴 DEPRECATED AND POSSIBLY WILL BE REMOVED IN RELIVATOR 1.3.0 🔴 ||
// Starting Relivator 1.3.0, it can be added by using pnpm reliverse ||
// ================================================================= ||
// @see https://github.com/jherr/app-router-auth-using-next-auth
// @see https://github.com/rexfordessilfie/next-auth-account-linking
// @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/auth/index.ts
// @see https://github.com/t3-oss/create-t3-app/blob/next/cli/template/extras/src/server/auth-app/with-drizzle.ts
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";

// Choose the appropriate table based on the provider
// let table;
// if (env.DATABASE_URL.startsWith("postgres://")) {
//   table = pgTable;
// } else if (env.DATABASE_URL.startsWith("mysql://")) {
//   table = mysqlTable;
// } else if (env.DATABASE_URL.startsWith("db.sqlite")) {
//   table = sqliteTable;
// } else {
//   consola.error("Invalid DATABASE_URL");
// }
// NextAuth.js Providers Configuration
// ===================================
// @see https://next-auth.js.org/providers/discord
// @see https://next-auth.js.org/providers/github
// @see https://next-auth.js.org/providers/google
// Note: Normally, when you sign in with an OAuth provider and another account with the same
// email address already exists, the accounts are not linked automatically. Automatic account
// linking on sign in is not secure between arbitrary providers and is disabled by default.
// @see https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/routes/callback/handle-login.ts#L174
// @see https://github.com/nextauthjs/next-auth/blob/main/docs/docs/guides/providers/custom-provider.md?plain=1#L83
// @see https://github.com/boxyhq/next-auth/blob/main/docs/docs/ref/adapters/index.md?plain=1#L175
// @see https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option
// @see https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/oauth.ts#L210
// @see https://github.com/dustij/dbudget/blob/main/src/app/api/auth/%5B...nextauth%5D/options.ts
// todo: try to implement our own safe account linking logic if possible
// @see https://authjs.dev/ref/core/adapters#linkaccount
//
const providers = [
  env.AUTH_DISCORD_ID &&
    env.AUTH_DISCORD_SECRET &&
    DiscordProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
    }),
  env.AUTH_GITHUB_ID &&
    env.AUTH_GITHUB_SECRET &&
    GithubProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  env.AUTH_GOOGLE_ID &&
    env.AUTH_GOOGLE_SECRET &&
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      // eslint-disable-next-line @stylistic/max-len
    }), //    // ...add more authjs providers here    // Most other providers require a bit more work than the Discord provider. For example, the
  // GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
  // model. Refer to the NextAuth.js docs for the provider you want to use. Example:
  // @see https://next-auth.js.org/providers/github
  //
].filter(Boolean) as Provider[];

// Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
// @see https://next-auth.js.org/providers
// @see https://authjs.dev/ref/adapter/drizzle
// @see https://next-auth.js.org/configuration/options
// @see https://next-auth.js.org/configuration/callbacks
export const authOptions: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session,
        id: user.id,
      },
    }),
  },
  pages: {
    newUser: "/auth",
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
  },
  providers,
  secret: env.AUTH_SECRET,
};
