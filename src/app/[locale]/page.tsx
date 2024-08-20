import type { Metadata } from "next";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "~/app";
import { HomeFeaturedItems } from "~/components/Commerce/FeaturedStoreItems";
import { Features } from "~/components/Common/features";
import HomeBottomSection from "~/components/Marketing/BottomSection";
import { BannerWithButton } from "~/components/Marketing/Elements/Banners/with-button";
import HomeHeroSection from "~/components/Marketing/HeroSection";
import HomeMainSection from "~/components/Marketing/MainSection";
import { AccordionSection } from "~/components/Sections/Questions/AccordionSection";
import { Shell } from "~/components/Wrappers/ShellVariants";

// @see https://github.com/blefnk/relivator
export async function generateMetadata() {
  // useTranslations works both on the server and client;
  // we only need the getTranslations on async functions.
  const t = await getTranslations();

  const metadata: Metadata = {
    title: `${t("metadata.title.home")} - ${siteConfig.appNameDesc}`,
  };

  return metadata;
}

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <BannerWithButton
        linkHref="https://reliverse.org/relivator/v126"
        tTitle={t("banners.announcements-1.title")}
        tDetails={t("banners.announcements-1.details")}
        tButton={t("banners.announcements-1.button")}
        tDismiss={t("banners.announcements-1.dismiss")}
      />
      <HomeHeroSection />
      <Shell
        className={`
          px-10

          2xl:px-32

          lg:20
        `}
      >
        <HomeFeaturedItems />
        <HomeMainSection />
        <Features />
        <AccordionSection />
        <HomeBottomSection />
      </Shell>
    </>
  );
}
