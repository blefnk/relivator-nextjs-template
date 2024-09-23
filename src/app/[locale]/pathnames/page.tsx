import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import PageLayout from "~/components/Common/PageLayout";

type Props = {
  params: { locale: string };
};

// export default function PathnamesPage({ params: { locale } }: Props) {
export default function PathnamesPage({ params: { locale } }: Props) {
  // TODO: Reliverse CLI: Enable static rendering when
  // TODO: choosing static export in the next.config.js
  unstable_setRequestLocale(locale);

  const t = useTranslations("PathnamesPage");

  return (
    <PageLayout title={t("title")}>
      <div className="max-w-[490px]">
        {t.rich("description", {
          code: (chunks) => <code className="font-mono">{chunks}</code>,
          p: (chunks) => <p className="mt-4">{chunks}</p>,
        })}
      </div>
    </PageLayout>
  );
}
