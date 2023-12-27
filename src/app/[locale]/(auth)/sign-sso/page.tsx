import { type HandleOAuthCallbackParams } from "@clerk/types";

import SSOCallback from "~/islands/account/sso-callback";
import { Shell } from "~/islands/wrappers/shell-variants";

export interface SSOCallbackPageProperties {
  searchParams: HandleOAuthCallbackParams;
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProperties) {
  return (
    <Shell className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  );
}
