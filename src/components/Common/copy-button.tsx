// @see https://usehooks.com/usecopytoclipboard
import type { ButtonProps } from "@/components/ui/button";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value, ...props }: ButtonProps) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);

  return (
    <Button
      className="absolute right-5 top-4 z-20 size-6 px-0"
      onClick={() => {
        copyToClipboard(value?.toString() || "");

        // if (typeof window === "undefined") return;

        // setIsCopied(true);

        // void window.navigator.clipboard.writeText(value?.toString() || "");

        // setTimeout(() => setIsCopied(false), 2000);
      }}
      size="sm"
      variant="outline"
      {...props}
    >
      {hasCopiedText ? (
        <Check aria-hidden="true" className="size-3" />
      ) : (
        <Copy aria-hidden="true" className="size-3" />
      )}
      <span className="sr-only">
        {hasCopiedText ? "Copied" : "Copy to clipboard"}
      </span>
    </Button>
  );
}
