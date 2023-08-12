// import { getI18n, getScopedI18n } from "~/utils/server/i18n";

export default async function Header() {
  // const t = await getI18n();
  // const scopedT = await getScopedI18n("hello");

  return (
    <div>
      {/* <p>{t("hello")}</p> */}

      {/* Both are equivalent: */}
      {/* <p>{t("hello.world")}</p> */}
      {/* <p>{scopedT("world")}</p> */}

      {/* <p>{t("welcome", { name: "Nazar" })}</p> */}
      {/* <p>{t("welcome", { name: <strong>Nazar</strong> })}</p> */}
    </div>
  );
}
