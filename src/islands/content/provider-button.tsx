import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "~/utils";
import { Loader2 } from "lucide-react";
import { getProviders, signIn, type ClientSafeProvider } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";

import { ActionButton } from "~/islands/account/action-button";
import { Spinner } from "~/islands/modules/spinner";
import { Button, buttonVariants } from "~/islands/primitives/button";

/**
 * @see https://github.com/search?q=ProviderButton%20path%3Atsx&type=code
 */

type ProviderButtonProps = {
  onClick: () => void;
  isRegPage: boolean;
  loading: boolean;
  provider: ClientSafeProvider;
};

export default function ProviderButton({
  onClick,
  isRegPage,
  loading,
  provider,
}: ProviderButtonProps) {
  const t = useTranslations();

  return (
    <div
      key={provider.id}
      className="w-full flex justify-center flex-row gap-2 items-baseline"
    >
      <Button
        variant="outline"
        disabled={loading}
        onClick={onClick}
        className={`transition font-semibold max-w-lg duration-400 flex-1 text-lg px-4 py-5 rounded-full shadow-md dark:bg-zinc-900 dark:text-zinc-300 flex gap-3 items-center bg-zinc-50 text-zinc-900 ${
          loading ? "animate-opacity opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("auth-provider.please-wait")}
          </>
        ) : (
          <>
            {isRegPage
              ? t("auth-provider.sign-up-null", { name: provider.name })
              : t("auth-provider.sign-in-null", { name: provider.name })}
          </>
        )}
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
