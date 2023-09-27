"use client";

import { type FC } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, type ClientSafeProvider } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import { ActionButton } from "~/islands/account/action-button";

type ProviderButtonProps = {
  provider: ClientSafeProvider;
};

export const ProviderButton: FC<ProviderButtonProps> = ({ provider }) => {
  const t = useTranslations("signIn");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const handleClick = async () => {
    await signIn(provider.id, {
      callbackUrl: searchParams?.get("callbackUrl") || `/${locale}`,
    });
  };

  return (
    <ActionButton type="button" onClick={handleClick}>
      {t("providerButtonText", { name: provider.name })}
      provider
    </ActionButton>
  );
};
