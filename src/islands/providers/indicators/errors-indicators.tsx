import { env } from "~/env.mjs";

import { Card, CardContent } from "~/islands/primitives/card";

type ShowErrorsProps = {
  hide?: boolean;
};

export function ShowErrors({ hide = false }: ShowErrorsProps) {
  const expectedVars = [
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "DISCORD_CLIENT_ID",
    "DISCORD_CLIENT_SECRET",
  ];
  const missingVars: string[] = [];

  expectedVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  const hasAnyAuthClientInfo =
    (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) ||
    (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) ||
    (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET);

  // Do not show the component if `hide` is true, no vars are missing,
  // or at least one pair of client ID and secret is specified.
  if (
    env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" ||
    hide ||
    missingVars.length === 0 ||
    hasAnyAuthClientInfo
  )
    return null;

  return (
    <Card as="section">
      <CardContent className="flex text-sm flex-wrap flex-1 place-items-start gap-4 mt-6">
        <div className="flex-1">
          {missingVars.length > 0 ? (
            <>
              <h2 className="text-base">
                ⚠️ The following variables are missing:
                <br />{" "}
              </h2>
              <p className="dark:text-red-400 text-red-900 mt-2">
                {missingVars.map((varName, index) => (
                  <span
                    key={index}
                    className="dark:text-red-400 text-red-900 font-mono text-base"
                  >
                    {varName}
                    {index < missingVars.length - 1 ? ", " : " "}
                  </span>
                ))}
              </p>
              <p className="mt-2 text-muted-foreground">
                Verify their presence in your .env file (or in your deployment
                service).
              </p>
            </>
          ) : null}
          <p className="text-muted-foreground">
            <span className="font-bold">
              It's okay to specify only GitHub or Google variables to unlock
              auth features.
            </span>{" "}
          </p>
          <p className="text-sm text-muted-foreground">
            The application will continue to function, but features related to
            the missing variables will be disabled.
          </p>
          <p className="text-sm text-muted-foreground">
            To suppress this warning, utilize {`<ShowErrors hide />`} in
            src/app/[locale]/layout.tsx, not recommended.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
