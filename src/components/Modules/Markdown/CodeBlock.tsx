import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { CopyButton } from "~/components/Common/copy-button";

type CodeBlockProps = {
  raw?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;

export function CodeBlock({ children, raw, ...props }: CodeBlockProps) {
  return (
    <>
      <CopyButton value={raw} />
      <pre
        className={`
          relative mb-4 mt-6 max-h-[640px] overflow-x-auto rounded-lg border
          bg-muted p-4 font-mono text-sm font-semibold text-muted-foreground
        `}
        {...props}
      >
        {children}
      </pre>
    </>
  );
}
