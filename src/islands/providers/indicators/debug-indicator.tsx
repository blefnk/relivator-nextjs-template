import { Card, CardContent } from "~/islands/primitives/card";

type DebugProps = {
  hide?: boolean;
  session?: any;
};

export function Debug({ hide, session }: DebugProps) {
  if (hide) return null;

  return (
    /**
     * _For debug purposes_ use {session} to check the session object:
     * @see https://next-auth.js.org/configuration/nextjs#in-app-router
     */
    <Card as="section">
      <CardContent className="flex text-sm flex-wrap flex-1 place-items-start gap-4 mt-6">
        {session && (
          <div className="flex-1">
            <h2 className="font-semibold">Session Debug:</h2>
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
