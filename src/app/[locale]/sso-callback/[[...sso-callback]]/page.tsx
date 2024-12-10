import type { HandleOAuthCallbackParams } from "@clerk/types";

import { Card } from "~/components/ui/card";

import SSOCallback from "./client";

export default async function SSOCallbackPage({
  params,
}: {
  params: Promise<{ searchParams: HandleOAuthCallbackParams }>;
}) {
  const resolvedParams = await params;
  const { searchParams } = resolvedParams;
  return (
    <Card className="max-w-lg place-items-center">
      <SSOCallback searchParams={searchParams} />
    </Card>
  );
}
