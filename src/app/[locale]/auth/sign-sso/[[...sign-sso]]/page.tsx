import type { SSOCallbackPageProps } from "@/types/reliverse/auth";

import SSOCallback from "~/components/Account/SsoCallback";
import { Shell } from "~/components/Wrappers/ShellVariants";

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <Shell className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  );
}
