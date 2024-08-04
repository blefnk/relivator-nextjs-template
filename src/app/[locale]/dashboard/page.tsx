import Link from "next/link";

import { Separator } from "@/browser/reliverse/ui/Separator";
import Onboarding from "@/cluster/reliverse/components/Onboarding";

import { Shell } from "~/components/Wrappers/ShellVariants";
import { env } from "~/env";

export default function DashboardPage() {
  return (
    <Shell>
      <section className="">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Separator
          className={`
            mt-2

            md:hidden
          `}
        />
      </section>
      <section
        className={`
          flex gap-2 text-sm

          md:hidden
        `}
      >
        <Link href="/dashboard/stores">Stores</Link>
        <Link href="/dashboard/billing">Billing</Link>
        <Link href="/dashboard/account">Account</Link>
        <Link href="/dashboard/settings">Settings</Link>
        <Link href="/dashboard/purchases">Purchases</Link>
        <Link href="/dashboard/admin">Admin</Link>
      </section>
      {env.NODE_ENV === "development" && <Onboarding />}
    </Shell>
  );
}
