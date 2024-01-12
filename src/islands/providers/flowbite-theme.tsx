import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: "divide-y divide-zinc-200 border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700",
      flush: {
        off: "rounded-lg border",
        on: "border-b",
      },
    },
    content: {
      base: "py-5 px-5 last:rounded-b-lg dark:bg-zinc-900 first:rounded-t-lg",
    },
    title: {
      arrow: {
        base: "h-6 w-6 shrink-0",
        open: {
          off: "",
          on: "rotate-180",
        },
      },
      base: "flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-zinc-500 dark:text-zinc-400",
      flush: {
        off: "hover:bg-zinc-100 focus:ring-4 focus:ring-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-zinc-800",
        on: "bg-transparent dark:bg-transparent",
      },
      heading: "flex w-full flex-row justify-between",
      open: {
        off: "",
        on: "text-zinc-900 bg-zinc-100 dark:bg-zinc-800 dark:text-white",
      },
    },
  },
  navbar: {
    root: {
      base: "bg-black px-2 py-2.5 dark:border-zinc-700 dark:bg-zinc-800 sm:px-4",
      rounded: {
        on: "rounded",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-between",
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center",
    },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pr-4 pl-3 md:p-0",
      active: {
        on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
        off: "border-b border-zinc-100 text-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-zinc-400 hover:cursor-not-allowed dark:text-zinc-600",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-zinc-500 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600 md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  },
};
