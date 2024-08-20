import { Balancer } from "react-wrap-balancer";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/reliverse/cn";

import {
  BMaCoffeSVG,
  GithubSVG,
  PatreonSVG,
  PaypalSVG,
} from "~/components/Common/Icons/SVG";

export function FundingPlatforms() {
  return (
    <div
      className={`
        mx-auto my-4 grid justify-center gap-4

        lg:grid-cols-4

        md:grid-cols-2

        sm:grid-cols-2
      `}
    >
      <FundingPlatform
        description="github.com/sponsors/blefnk"
        link="https://github.com/sponsors/blefnk"
        platform="github"
        title="GitHub Sponsors"
      />
      <FundingPlatform
        description="paypal.me/blefony"
        link="https://paypal.me/blefony"
        platform="paypal"
        title="PayPal"
      />
      <FundingPlatform
        description="patreon.com/blefnk"
        link="https://patreon.com/blefnk"
        platform="patreon"
        title="Patreon"
      />
      <FundingPlatform
        description="buymeacoffee.com/blefnk"
        link="https://buymeacoffee.com/blefnk"
        platform="buymeacoffee"
        title="Buy Me a Coffee"
      />
    </div>
  );
}

type Platform = "buymeacoffee" | "github" | "patreon" | "paypal";

type FundingPlatformProps = {
  description: string;
  link: string;
  platform: Platform;
  title: string;
};

function FundingPlatform({
  description,
  link,
  platform,
  title,
}: FundingPlatformProps) {
  const renderIcon = (platform: Platform) => {
    switch (platform) {
      case "buymeacoffee":
        return <BMaCoffeSVG aria-hidden className="size-8" />;

      case "github":
        return <GithubSVG aria-hidden className="size-8" />;

      case "patreon":
        return <PatreonSVG aria-hidden className="size-8" />;

      case "paypal":
        return <PaypalSVG aria-hidden className="size-8" />;

      default:
        return null;
    }
  };

  return (
    <Link
      className={`
        overflow-hidden rounded-lg border bg-background p-2 text-left

        dark:hover:bg-zinc-900

        hover:bg-zinc-50
      `}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex flex-col justify-between rounded-lg p-6">
        <div className="flex min-h-[64px] items-center space-x-4">
          {renderIcon(platform)}
          <Balancer
            as="h2"
            className={cn(`
              text-lg font-medium tracking-tight text-muted-foreground

              sm:text-xl
            `)}
          >
            {title}
          </Balancer>
        </div>
        <Separator className="my-4" />
        <Balancer as="p" className="flex text-muted-foreground">
          {description}
        </Balancer>
      </div>
    </Link>
  );
}
