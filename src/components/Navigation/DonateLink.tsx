import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { Coffee } from "lucide-react";
import { disableDonateButton } from "reliverse.config";

// import { isDevelopment } from "std-env";
// import { env } from "~/env";

// @see src/app/[locale]/donate/page.tsx
export function DonateLink() {
  if (disableDonateButton) {
    return null;
  }

  return (
    <Link
      className={cn(
        buttonVariants({
          size: "default",
          variant: "secondary",
        }),
        "space-x-1",
      )}
      href="/donate"

      // href={
      //   isDevelopment
      //     ? env.DEMO_NOTES_ENABLED === "true"
      //       ? "/donate"
      //       : "https://github.com/blefnk/relivator#sponsors"
      //     : "/donate"
      // }
    >
      <Coffee className="size-4" />
      <span
        className={`
          hidden

          md:flex
        `}
      >
        Donate
      </span>
    </Link>
  );
}
