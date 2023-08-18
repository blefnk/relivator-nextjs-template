"use client";

// import { useI18n, useScopedI18n } from "~/utils/appts/config/i18n";

export default function Footer() {
  // const t = useI18n();
  // const scopedT = useScopedI18n("hello");

  return (
    <div>
      {/* <p>{t("hello")}</p> */}

      {/* Both are equivalent: */}
      {/* <p>{t("hello.world")}</p> */}
      {/* <p>{scopedT("world")}</p> */}

      {/* <p>{t("welcome", { name: "Petro" })}</p> */}
      {/* <p>{t("welcome", { name: <strong>Petro</strong> })}</p> */}
    </div>
  );
}
