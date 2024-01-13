import { env } from "~/env.mjs";
import { Card, CardContent } from "~/islands/primitives/card";

type ShowInfoProps = {
  debug?: boolean;
  hide?: boolean;
  session?: any;
};

export function ShowInfo({
  hide = false,
  debug = false,
  session = null,
}: ShowInfoProps) {
  // ===========================================
  // IMPORTANT
  // ===========================================
  const importantVars = [
    "NEXT_PUBLIC_DB_PROVIDER",
    "DATABASE_URL",
    "NEXT_PUBLIC_AUTH_PROVIDER",
    "NEXT_PUBLIC_APP_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "NEXT_PUBLIC_INTL_PROVIDER",
  ];
  const isImportantVarsWithoutKeys: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  importantVars.forEach((envVar) => {
    if (!env[envVar]) {
      isImportantVarsWithoutKeys.push(envVar);
    }
  });

  // ===========================================
  // CLERK
  // ===========================================
  const clerkVars = ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"];
  const missingClerkVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  clerkVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingClerkVars.push(envVar);
    }
  });
  const isClerkProviderWithoutKeys =
    env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" && missingClerkVars.length > 0;

  // ===========================================
  // STRIPE
  // ===========================================
  const stripeVars = [
    "STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID",
    "STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SIGNING_SECRET",
  ];
  const missingStripeVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  stripeVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingStripeVars.push(envVar);
    }
  });
  const isStripeWithoutKeys = missingStripeVars.length > 0;

  // ===========================================
  // AUTHJS
  // ===========================================
  const authjsVars = [
    "DISCORD_CLIENT_SECRET",
    "DISCORD_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GITHUB_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
  ];
  const missingAuthjsVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  authjsVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingAuthjsVars.push(envVar);
    }
  });
  const isAuthjsProviderWithoutKeys =
    (env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs" ||
      !env.NEXT_PUBLIC_AUTH_PROVIDER) &&
    missingAuthjsVars.length > 0;
  // Do not not show the `authjs` alert if at least
  // one pair of client ID and secret is specified.
  const hasAnyAuthClientInfo =
    (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) ||
    (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) ||
    (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET);

  // ===========================================
  // OTHER
  // ===========================================
  const otherVars = [
    "UPLOADTHING_SECRET",
    "UPLOADTHING_APP_ID",
    "GITHUB_CLIENT_SECRET",
    "NEXT_PUBLIC_IS_LIVE",
    "CHECK_BOT_ACTIVITY",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "ADDITIONAL_CSP_ORIGINS",
    "NEXT_PUBLIC_CSP_XSS",
  ];
  const missingOtherVars: string[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  otherVars.forEach((envVar) => {
    if (!env[envVar]) {
      missingOtherVars.push(envVar);
    }
  });
  const isOtherVarsWithoutKeys = missingOtherVars.length > 0;

  // ===========================================
  // COMPONENT
  // ===========================================

  // Check if all environment variables are present
  const allVarsPresent =
    isImportantVarsWithoutKeys.length === 0 &&
    (!isClerkProviderWithoutKeys || missingClerkVars.length === 0) &&
    (!isStripeWithoutKeys || missingStripeVars.length === 0) &&
    (hasAnyAuthClientInfo || !isAuthjsProviderWithoutKeys) &&
    missingOtherVars.length === 0;

  // Do not display the component if hide=true or all variables are present
  if (allVarsPresent || hide || env.NEXT_PUBLIC_HIDE_ENV_INFO === "true") {
    return null;
  }

  return (
    <>
      <Card as="section">
        <CardContent className="mt-6 flex flex-1 flex-wrap place-items-start gap-4 text-sm">
          <div className="flex-1">
            {isImportantVarsWithoutKeys.length > 0 && (
              <>
                <h2 className="text-sm text-muted-foreground ">
                  The following <span className="font-semibold">optional</span>{" "}
                  environment variables are missing in your{" "}
                  <span className="font-semibold">.env</span> file (please refer
                  to .env.example file):
                  <br />{" "}
                </h2>
                <p className="mt-2 text-red-950 dark:text-red-400">
                  <span className="text-base">
                    Important variables are missing:
                  </span>{" "}
                  {isImportantVarsWithoutKeys.map((varName, index) => (
                    <span
                      key={index}
                      className="text-sm text-red-900 dark:text-red-400"
                    >
                      {varName}
                      {index < isImportantVarsWithoutKeys.length - 1 ?
                        ", "
                      : " "}
                    </span>
                  ))}
                </p>
              </>
            )}
            {isClerkProviderWithoutKeys && (
              <p className="mt-2">
                Clerk is specified as the auth provider, but its keys are
                missing:
                <br />
                {missingClerkVars.join(", ")}.
              </p>
            )}
            {isAuthjsProviderWithoutKeys && !hasAnyAuthClientInfo && (
              <>
                <p className="mt-2">
                  <span className="font-semibold">
                    Authjs or nothing is specified as the auth provider, so
                    NextAuth.js is used, but its keys are missing:
                  </span>{" "}
                  {missingAuthjsVars.join(", ")}.
                </p>
                <p className="text-muted-foreground">
                  It's okay to specify only GitHub, Google, or Discord variables
                  to unlock NextAuth.js features.
                </p>
              </>
            )}
            {isStripeWithoutKeys && (
              <p className="mt-2">
                <span className="font-semibold">Stripe keys are missing:</span>{" "}
                {missingStripeVars.join(", ")}.
              </p>
            )}
            {isOtherVarsWithoutKeys && (
              <p className="mt-2">
                <span className="font-semibold">
                  Additional keys are missing:
                </span>{" "}
                {missingOtherVars.join(", ")}.
              </p>
            )}
            <p className="mt-2 text-muted-foreground">
              Verify the presence of these variables in your .env file (or in
              your deployment service).
            </p>
            <p className="text-sm text-muted-foreground">
              The application will continue to function, but features related to
              the missing variables will be disabled.
            </p>
            <p className="text-sm text-muted-foreground">
              To suppress this warning, set NEXT_PUBLIC_HIDE_ENV_INFO to true,
              but it is not recommended.
            </p>
          </div>
        </CardContent>
      </Card>

      {/*
       * _For debug purposes_ use {session} to check the session object:
       * @see https://next-auth.js.org/configuration/nextjs#in-app-router
       */}
      {debug && session !== null && (
        <>
          <Card as="section">
            <CardContent className="mt-6 flex flex-1 flex-wrap place-items-start gap-4 text-sm">
              {session && (
                <div className="flex-1">
                  <h2 className="font-semibold">Session Debug:</h2>
                  <pre>{JSON.stringify(session, null, 2)}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
