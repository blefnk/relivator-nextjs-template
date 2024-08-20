import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/utils/reliverse/cn";
import { cva } from "class-variance-authority";

const kbdVariants = cva(
  `
    select-none rounded border px-1.5 py-px font-mono text-[0.7rem] font-normal
    shadow-sm

    disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        outline: "bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type KbdProps = {
  /**
   * The title of the `abbr` element inside the `kbd` element.
   * @default undefined
   * @type string | undefined
   * @example title="Command"
   */
  abbrTitle?: string;
} & ComponentPropsWithoutRef<"kbd"> &
  VariantProps<typeof kbdVariants>;

const Kbd = forwardRef<HTMLUnknownElement, KbdProps>(
  ({ abbrTitle, children, className, variant, ...props }, ref) => {
    return (
      <kbd
        className={cn(kbdVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {abbrTitle ? (
          <abbr title={abbrTitle} className="no-underline">
            {children}
          </abbr>
        ) : (
          children
        )}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";

export { Kbd };
