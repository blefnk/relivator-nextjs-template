import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { disableDonateButton } from "~/../reliverse.config";
import { Coffee } from "lucide-react";

import { Link } from "~/navigation";

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
      href={"/donate" as any}

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
