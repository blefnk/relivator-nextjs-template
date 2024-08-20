export const appMainName = "Acme Store" as const;

export const authProvider = "clerk" as "authjs" | "clerk" | "none";

export const debugEnabled = false;

export const engineVersion = "0.4.0" as const;

export const frameworkVersion = "1.2.6" as const;

export const hideEnvInfo = false;

export const hideTanstackDevtools = true;

export const hideTailwindIndicator = false;

export const disableDonateButton = false;

export const intlProvider = "next-intl" as "disable" | "next-intl";

// Relivator 1.3.0 will use 'bun' as the default package manager
export const packageManager = "pnpm" as "bun" | "pnpm";

// @see https://github.com/blefnk/relivator-nextjs-template/issues/32
export type DatabaseDialect = "mysql" | "postgresql" | "sqlite";

export const databasePrefix = // eslint-disable-next-line no-restricted-properties
  process.env.NEXT_PUBLIC_DATABASE_PREFIX || "relivator";

export const databaseDialect = "postgresql";

// ### Type definitions for database provider
// - neon           | postgres  | https://neon.tech
// - planetscale    | mysql     | https://planetscale.com/pricing
// - private-mysql  | postgres  | https://dev.mysql.com/downloads
// - private-pg     | postgres  | https://postgresql.org
// - private-sqlite | sqlite    | https://github.com/WiseLibs/better-sqlite3
// - railway-mysql  | mysql     | https://railway.app
// - railway-pg     | postgres  | https://railway.app
// - turso          | sqlite    | https://turso.tech
// - vercel         | postgres  | https://vercel.com/storage/postgres
export type DatabaseProvider =
  | "neon"
  | "planetscale"
  | "private-mysql"
  | "private-pg"
  | "private-sqlite"
  | "railway-mysql"
  | "railway-pg"
  | "turso"
  | "vercel";

// Configurations for database provider and dialect
export const databaseProvider = "neon" as DatabaseProvider;
