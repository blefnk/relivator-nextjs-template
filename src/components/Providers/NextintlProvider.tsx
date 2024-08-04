"use client";

import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";
import _ from "radash";

const noop = () => {};

// @deprecated
// next-intl: next.js internationalization library
// @see https://next-intl-docs.vercel.app
export function NextIntlProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: unknown;
}) {
  return (
    <NextIntlClientProvider
      getMessageFallback={({ error, key, namespace }) => {
        const nestedMessages = _.get(messages, namespace || "");

        if (!nestedMessages) {
          return key;
        }

        if (error.code === "MISSING_MESSAGE") {
          // @ts-expect-error - default key
          return nestedMessages.default;
        }

        // @ts-expect-error TODO: fix key
        return nestedMessages[key];
      }}
      locale={locale} // @ts-expect-error TODO: fix
      messages={messages}
      onError={noop}
    >
      {children}
    </NextIntlClientProvider>
  );
}
