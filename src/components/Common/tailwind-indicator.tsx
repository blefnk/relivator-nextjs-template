import { hideTanstackDevtools } from "~/../reliverse.config";

import { env } from "~/env";

export function TailwindScreens() {
  if (env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      className={`
        ${hideTanstackDevtools ? "bottom-5" : "bottom-14"}

        fixed left-3 z-50 flex min-w-10 flex-col items-center justify-center
        rounded-lg border border-zinc-100 bg-zinc-50 p-2 font-mono text-sm
        text-zinc-800

        dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200
      `}
    >
      <div
        className={`
          block

          sm:hidden
        `}
      >
        xs
      </div>
      <div
        className={`
          hidden

          2xl:hidden

          lg:hidden

          md:hidden

          sm:block

          xl:hidden
        `}
      >
        sm
      </div>
      <div
        className={`
          hidden

          2xl:hidden

          lg:hidden

          md:block

          xl:hidden
        `}
      >
        md
      </div>
      <div
        className={`
          hidden

          2xl:hidden

          lg:block

          xl:hidden
        `}
      >
        lg
      </div>
      <div
        className={`
          hidden

          2xl:hidden

          xl:block
        `}
      >
        xl
      </div>
      <div
        className={`
          hidden

          2xl:block
        `}
      >
        2xl
      </div>
    </div>
  );
}
