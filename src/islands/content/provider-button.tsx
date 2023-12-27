import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "~/utils";
import { Loader2 } from "lucide-react";
import { getProviders, signIn, type ClientSafeProvider } from "next-auth/react";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";

import { ActionButton } from "~/islands/account/action-button";
import { Spinner } from "~/islands/modules/spinner";
import { Button, buttonVariants } from "~/islands/primitives/button";

type ProviderButtonProps = {
  onClick: () => void;
  loading: boolean;
  provider: ClientSafeProvider;
  tPleaseWait: string;
};

export default function ProviderButton({
  onClick,
  loading,
  provider,
  tPleaseWait,
}: ProviderButtonProps) {
  return (
    <div
      key={provider.id}
      className="flex w-full flex-row items-baseline justify-center gap-2"
    >
      <Button
        variant="outline"
        disabled={loading}
        onClick={onClick}
        className={`flex max-w-lg flex-1 items-center gap-3 rounded-full bg-zinc-50 px-4 py-5 text-lg font-semibold text-zinc-900 shadow-md transition dark:bg-zinc-900 dark:text-zinc-300 ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {loading ?
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {tPleaseWait}
          </>
        : <>
            {/* <renderProviderIcon provider={provider.name} /> */}
            {provider.name}
          </>
        }
      </Button>
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getProviderName(provider: string) {
  switch (provider) {
    case "google":
      return "Google";
    case "github":
      return "GitHub";
    case "discord":
      return "Discord";
    default:
      return capitalizeFirstLetter(provider);
  }
}

function renderProviderIcon(provider: string) {
  switch (provider) {
    case "google":
      return <FaGoogle />;
    case "github":
      return <FaGithub />;
    case "discord":
      return <FaDiscord />;
    default:
      return null;
  }
}

/** @see https://github.com/search?q=ProviderButton%20path%3Atsx&type=code */
