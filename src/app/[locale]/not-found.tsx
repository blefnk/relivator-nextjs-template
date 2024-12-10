import { useTranslations } from "next-intl";

import { buttonVariants } from "~/components/ui/button";
import { Link } from "~/i18n/routing";
import { cn } from "~/utils";

export default function NotFound() {
  const t = useTranslations("not-found");
  return (
    <main className="flex flex-1 flex-col gap-4 px-2 items-center mt-24 max-w-xl mx-auto text-xl">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "default",
            className: "mx-auto mt-4 w-fit",
          }),
        )}
      >
        {t("go-home")}
      </Link>
    </main>
  );
}
