import type { PlateLeafProps } from "@udecode/plate-common";

import { cn } from "@/utils/reliverse/cn";
import { PlateLeaf } from "@udecode/plate-common";

const CodeLeaf = ({ children, className, ref, ...props }: PlateLeafProps) => (
  <PlateLeaf
    asChild
    className={cn(
      `
        rounded-lg border border-primary bg-primary px-1.5 py-0.5 text-sm
        font-medium text-secondary
      `,
      className,
    )}
    ref={ref}
    {...props}
  >
    <code>{children}</code>
  </PlateLeaf>
);

CodeLeaf.displayName = "CodeLeaf";

export { CodeLeaf };
