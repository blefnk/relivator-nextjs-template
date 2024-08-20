import type { PlateElementProps } from "@udecode/plate-common";

import { cn } from "@/utils/reliverse/cn";
import { PlateElement } from "@udecode/plate-common";

const ParagraphElement = ({
  children,
  className,
  ref,
  ...props
}: PlateElementProps) => (
  <PlateElement
    className={cn("m-0 px-0 py-2 leading-7 text-primary", className)}
    ref={ref}
    {...props}
  >
    {children}
  </PlateElement>
);

ParagraphElement.displayName = "ParagraphElement";

export { ParagraphElement };
