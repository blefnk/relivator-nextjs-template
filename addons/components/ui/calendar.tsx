"use client";

import type { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        cell: cn(
          `
            relative p-0 text-center text-sm

            [&:has([aria-selected])]:bg-accent

            focus-within:relative focus-within:z-20
          `,
          props.mode === "range"
            ? `
              [&:has(>.day-range-end)]:rounded-r-md
              [&:has(>.day-range-start)]:rounded-l-md

              first:[&:has([aria-selected])]:rounded-l-md

              last:[&:has([aria-selected])]:rounded-r-md
            `
            : "[&:has([aria-selected])]:rounded-lg",
        ),
        day: cn(
          buttonVariants({
            variant: "ghost",
          }),
          `
            size-8 p-0 font-normal

            aria-selected:opacity-100
          `,
        ),
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        day_outside: "text-muted-foreground opacity-50",
        day_range_end: "day-range-end",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_range_start: "day-range-start",
        day_selected: `bg-primary text-primary-foreground hover:bg-primary
          hover:text-primary-foreground focus:bg-primary
          focus:text-primary-foreground`,
        day_today: "bg-accent text-accent-foreground",
        head_cell:
          "text-muted-foreground rounded-lg w-8 font-normal text-[0.8rem]",
        head_row: "flex",
        month: "space-y-4",
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({
            variant: "outline",
          }),
          `
            size-7 bg-transparent p-0 opacity-50

            hover:opacity-100
          `,
        ),
        nav_button_next: "absolute right-1",
        nav_button_previous: "absolute left-1",
        row: "flex w-full mt-2",
        table: "w-full border-collapse space-y-1",
        ...classNames,
      }}
      components={{
        // @ts-expect-error TODO: fix
        // eslint-disable-next-line @eslint-react/no-nested-components
        IconLeft: ({ ...props_ }) => (
          <ChevronLeft className="size-4" {...props_} />
        ),
        // eslint-disable-next-line @eslint-react/no-nested-components
        IconRight: ({ ...props_ }) => (
          <ChevronRight className="size-4" {...props_} />
        ),
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
