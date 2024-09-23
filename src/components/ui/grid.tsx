import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "~/utils/cn";

type GridProps = {
  columns?: number;
  gap?: number;
} & HTMLAttributes<HTMLDivElement>;

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, columns = 2, gap = 4, ...props }, ref) => {
    const gridClass = cn(
      `
        grid

        grid-cols-${columns}

        gap-${gap}
      `,
      className,
    );

    return (
      <div className={gridClass} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

Grid.displayName = "Grid";

export { Grid };
