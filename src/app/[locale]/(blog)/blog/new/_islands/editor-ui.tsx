/** Reliverse CMS: Blog Post Editor */

import React from "react";
import { PlateContent } from "@udecode/plate-common";
import type { PlateContentProps } from "@udecode/plate-common";
import { cn } from "~/utils";

const Editor = React.forwardRef<HTMLDivElement, PlateContentProps>(
  ({ className, disabled, readOnly, ...props }, ref) => {
    return (
      <div ref={ref} className="relative w-full">
        <PlateContent
          className={cn(
            className,
            "relative h-full w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg px-2 py-8 outline-none [&_[data-slate-placeholder]]:top-[auto_!important] [&_[data-slate-placeholder]]:text-primary [&_[data-slate-placeholder]]:!opacity-100",
          )}
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          aria-disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);

Editor.displayName = "Editor";

export { Editor };

/**
 * Learn more/inspirations:
 * @see https://platejs.org
 * @see https://github.com/noodle-run/noodle/blob/main/src/editor/index.tsx
 */
