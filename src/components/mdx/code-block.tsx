"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

type CodeBlockProps = {
  // set by `rehype-pretty-code`
  "data-language"?: string;
  // set by `rehype-pretty-code`
  "data-theme"?: string;
} & React.HTMLProps<HTMLPreElement>;

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const language = props["data-language"];
  const theme = props["data-theme"];
  const Icon = {
    js: Icons.javascript,
    ts: Icons.typescript,
    bash: Icons.bash,
    // @ts-expect-error TODO: fix ts
  }[language];

  const ref = React.useRef<HTMLSpanElement>(null);
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <pre
      className="my-4 flex items-center gap-2 rounded-lg border bg-muted px-4 py-2.5 font-mono text-sm font-semibold text-muted-foreground"
      {...props}
    >
      {Icon && (
        <Icon
          data-language-icon
          data-theme={theme}
          className="size-5 text-foreground"
        />
      )}
      <ScrollArea
        orientation="horizontal"
        className="flex-1 py-2"
        scrollBarClassName="h-2"
      >
        <span ref={ref}>{children}</span>
      </ScrollArea>
      <Button
        variant="ghost"
        size="icon"
        className="size-6 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
        onClick={() => {
          if (typeof window === "undefined") {
            return;
          }
          setIsCopied(true);
          void window.navigator.clipboard.writeText(
            ref.current?.innerText ?? "",
          );
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        }}
      >
        {isCopied ? (
          <CheckIcon className="size-3" aria-hidden="true" />
        ) : (
          <CopyIcon className="size-3" aria-hidden="true" />
        )}
        <span className="sr-only">
          {isCopied ? "Copied" : "Copy to clipboard"}
        </span>
      </Button>
    </pre>
  );
}
