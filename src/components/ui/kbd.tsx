import type { VariantProps } from "class-variance-authority";

import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cva } from "class-variance-authority";

import { cn } from "~/utils/cn";

const kbdVariants = cva(
  `
    select-none rounded border px-1.5 py-px font-mono text-[0.7rem] font-normal
    shadow-sm

    disabled:opacity-50
  `,
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        outline: "bg-background text-foreground",
      },
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
        className={cn(kbdVariants({ className, variant }))}
        ref={ref}
        {...props}
      >
        {abbrTitle ? (
          <abbr className="no-underline" title={abbrTitle}>
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
