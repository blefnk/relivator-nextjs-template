"use client";

import { useState } from "react";

// @see https://mantine.dev/hooks/use-clipboard
export default function useClipboard({
  timeout = 2000,
} = {
  //
}) {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCopyRes = (value: boolean) => {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }

    setCopyTimeout(
      setTimeout(() => {
        setCopied(false);
      }, timeout),
    );
    setCopied(value);
  };

  const copy = (valueToCopy: string) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => {
          handleCopyRes(true);
        })
        .catch((error_: unknown) => {
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          return setError(error_ as Error);
        });
    } else {
      setError(
        new TypeError("useClipboard: navigator.clipboard is not supported"),
      );
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);

    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
  };

  return {
    copied,
    copy,
    error,
    reset,
  };
}
