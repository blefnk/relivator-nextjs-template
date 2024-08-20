import { forwardRef } from "react";

import type { PlateContentProps } from "@udecode/plate-common";

import { cn } from "@/utils/reliverse/cn";
import { PlateContent } from "@udecode/plate-common";

type EditorProps = {
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
} & PlateContentProps;

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ className, disabled, readOnly, ...props }, ref) => (
    <div className="relative w-full" ref={ref}>
      <PlateContent
        aria-disabled={disabled}
        className={cn(
          className,
          `
            relative size-full overflow-x-auto whitespace-pre-wrap break-words
            rounded-lg px-2 py-8 outline-none

            [&_[data-slate-placeholder]]:top-[auto_!important]
            [&_[data-slate-placeholder]]:text-primary
            [&_[data-slate-placeholder]]:!opacity-100
          `,
        )}
        disableDefaultStyles
        readOnly={disabled || readOnly}
        {...props}
      />
    </div>
  ),
);

Editor.displayName = "Editor";

// Learn more/inspirations:
// @see https://platejs.org
// @see https://github.com/noodle-run/noodle/blob/main/src/editor/index.tsx

export { Editor };
