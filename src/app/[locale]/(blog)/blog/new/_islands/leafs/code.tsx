import React from "react";
import { PlateLeaf, type PlateLeafProps } from "@udecode/plate-common";
import { cn } from "~/utils";

const CodeLeaf = React.forwardRef<
  React.ElementRef<typeof PlateLeaf>,
  PlateLeafProps
>(({ className, children, ...props }: PlateLeafProps, ref) => {
  return (
    <PlateLeaf
      ref={ref}
      className={cn(
        "rounded-lg border border-primary bg-primary px-1.5 py-0.5 text-sm font-medium text-secondary",
        className,
      )}
      asChild
      {...props}
    >
      <code>{children}</code>
    </PlateLeaf>
  );
});

CodeLeaf.displayName = "CodeLeaf";

export { CodeLeaf };
