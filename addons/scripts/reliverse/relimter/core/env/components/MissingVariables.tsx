import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  checkAuthConditions,
  getMissingVariables,
} from "@/scripts/reliverse/relimter/core/env/get-missing";
import { config } from "@reliverse/core";
import { authProvider, debugEnabled, hideEnvInfo } from "~/../reliverse.config";

type EnvInfoProps = {
  hide?: boolean;
  session?: unknown;
};

export function EnvInfo({ hide = false, session = null }: EnvInfoProps) {
  const {
    missingAuthjsVariables,
    missingClerkVariables,
    missingImportantVariables,
    missingOtherVariables,
    missingStripeVariables,
  } = getMissingVariables();

  const {
    hasAnyAuthClientInfo,
    hasAuthSecret,
    isAuthjsProviderWithoutKeys,
    isClerkProviderWithoutKeys,
  } = checkAuthConditions(missingClerkVariables, missingAuthjsVariables);

  const allVariablesPresent =
    missingImportantVariables.length === 0 &&
    !isClerkProviderWithoutKeys &&
    missingClerkVariables.length === 0 &&
    missingStripeVariables.length === 0 &&
    hasAnyAuthClientInfo &&
    hasAuthSecret &&
    !isAuthjsProviderWithoutKeys &&
    missingOtherVariables.length === 0;

  if (allVariablesPresent || hide || hideEnvInfo) {
    return null;
  }

  return (
    <Card className="mx-12 mb-2 mt-6">
      <CardContent className="flex flex-1 flex-wrap place-items-start gap-4 text-sm">
        <Accordion className="flex-1" collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {/* eslint-disable-next-line @stylistic/max-len */}
              {`Hello, and thank you so much for installing ${config.framework.name} ${config.framework.version}! To complete the installation – read this accordion.`}
            </AccordionTrigger>
            <AccordionContent>
              <MissingVariablesMessage
                title="Important variables are missing:"
                variables={missingImportantVariables}
              />
              {authProvider === "clerk" ? (
                <MissingVariablesMessage
                  title="Clerk is specified as the authProvider in the reliverse.config.ts, but its keys are missing:"
                  variables={missingClerkVariables}
                />
              ) : (
                <>
                  <p className="mt-2">
                    <span className="font-semibold">
                      Auth.js or nothing is specified as the authProvider in the
                      'reliverse.config.ts, so NextAuth.js is used, but its keys
                      are missing:
                    </span>
                    <br />
                    {missingAuthjsVariables.join(", ")}.
                  </p>
                  <p className="text-muted-foreground">
                    It's okay to specify only GitHub, Google, or Discord
                    variables to unlock NextAuth.js features.
                  </p>
                </>
              )}
              <MissingVariablesMessage
                title="Stripe keys are missing:"
                variables={missingStripeVariables}
              />
              <MissingVariablesMessage
                title="Other keys are missing:"
                variables={missingOtherVariables}
              />
              <p className="mt-2 text-muted-foreground">
                Verify the presence of these variables in the .env file (or in
                the deployment service).
              </p>
              <p className="text-sm text-muted-foreground">
                The application will continue to function, but features related
                to the missing variables will be disabled.
              </p>
              <p className="text-sm text-muted-foreground">
                To suppress this warning, set hideEnvInfo to true in the
                'reliverse.config.ts' file. This message will be disabled by
                default in Relivator 1.3.0.
              </p>
              <p className="text-sm text-muted-foreground">
                You can use 'pnpm lint:env' to see this message in the terminal.
                By using the script version, you can also check unknown
                variables in your .env file.
              </p>
              <p className="text-sm text-muted-foreground">
                If you don't want to specify any of this, you can modify the
                required provider variables in the src/env.js file -
                recommendedEnvVariables. It is recommended to restart the
                terminal after fixing your env vars. You can hover over a ⚠ icon
                in VSCode's terminal and click on Relaunch.
              </p>
              {debugEnabled && session !== null && (
                <Card>
                  <CardContent
                    className={`
                      mt-6 flex flex-1 flex-wrap place-items-start gap-4 text-sm
                    `}
                  >
                    {session && (
                      <div className="flex-1">
                        <h2 className="font-semibold">Session Debug:</h2>
                        <pre>{JSON.stringify(session, null, 2)}</pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

type MissingVariablesMessageProps = {
  title: string;
  variables: string[];
};

const MissingVariablesMessage = ({
  title,
  variables,
}: MissingVariablesMessageProps) => (
  <>
    {variables.length > 0 && (
      <p className="mt-2">
        <span className="font-semibold">{title}</span>
        <br />
        {variables.join(", ")}.
      </p>
    )}
  </>
);
