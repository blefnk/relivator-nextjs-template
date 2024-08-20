"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

type BannerWithButtonAnimatedProps = {
  linkHref: string;
  tButton: string;
  tDetails: string;
  tTitle: string;
};

export function BannerWithButtonAnimated({
  tTitle,
  tDetails,
  tButton,
  linkHref,
}: BannerWithButtonAnimatedProps) {
  const t = useTranslations();

  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleHideButton = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // This should match the exit animation duration defined in globals.css
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`
        relative isolate flex items-center gap-x-6 overflow-hidden bg-zinc-50
        px-6 py-2.5 animate-in fade-in slide-in-from-top-full duration-slow
        animated-gradient

        sm:px-3.5 sm:before:flex-1

        ${isExiting ? "animate-out fade-out slide-out-to-top-full" : ""}
      `}
    >
      <BackgroundDecor />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-zinc-700">
          <strong className="font-semibold">{tTitle}</strong>
          <Separator />
          {tDetails}
        </p>
        <Link
          href={linkHref}
          className={`
            flex-none rounded-full bg-zinc-900 px-3.5 py-1 text-sm font-semibold
            text-white shadow-sm

            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-zinc-900

            hover:bg-zinc-700
          `}
        >
          {tButton}{" "}
          <span aria-hidden="true" className="ml-1">
            &rarr;
          </span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <Button variant="ghost" type="button" className="-m-3-1 p-3">
          <span className="sr-only">{t("with-button-animated.dismiss")}</span>
          <X
            onClick={handleHideButton}
            aria-hidden="true"
            className="size-5 text-zinc-900"
          />
        </Button>
      </div>
    </div>
  );
}

const BackgroundDecor = () => (
  <>
    <div
      aria-hidden="true"
      className={`
        absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10
        -translate-y-1/2 transform-gpu blur-2xl animated-gradient
      `}
    >
      <div
        className={`
          aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5]
          to-[#9089fc] opacity-30
        `}
      />
    </div>
    <div
      aria-hidden="true"
      className={`
        absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2
        transform-gpu blur-2xl animated-gradient
      `}
    >
      <div
        className={`
          aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5a9]
          to-[#9189fc9d] opacity-30
        `}
      />
    </div>
  </>
);

const Separator = () => (
  <svg
    viewBox="0 0 2 2"
    aria-hidden="true"
    className="mx-2 inline-block size-0.5 fill-current"
  >
    <circle r={1} cx={1} cy={1} />
  </svg>
);
