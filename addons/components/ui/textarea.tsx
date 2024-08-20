import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";

export type TextareaProps = {} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `
            flex min-h-[60px] w-full rounded-md border border-input
            bg-transparent px-3 py-2 text-sm shadow-sm

            disabled:cursor-not-allowed disabled:opacity-50

            focus-visible:outline-none focus-visible:ring-1
            focus-visible:ring-ring

            placeholder:text-muted-foreground
          `,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
