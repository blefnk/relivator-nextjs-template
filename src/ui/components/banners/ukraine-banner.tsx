"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "~/ui/primitives/button";

interface UkraineBannerProps {
  animateGradient?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function UkraineBanner({
  animateGradient = true,
  onClose,
  showCloseButton = true,
}: UkraineBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const bannerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      bannerRef.current.style.height = `${height}px`;

      void bannerRef.current.offsetHeight;

      bannerRef.current.classList.add("banner-closing");

      bannerRef.current.style.height = "0";
      bannerRef.current.style.opacity = "0";
      bannerRef.current.style.paddingTop = "0";
      bannerRef.current.style.paddingBottom = "0";

      setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, 500);
    } else {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }
  };

  if (!isVisible) return null;

  const backgroundStyle = animateGradient
    ? {
        animation: "gradientMove 45s linear infinite",
        background:
          "linear-gradient(90deg, #0057b7 0%, #0057b7 40%, #ffd700 60%, #ffd700 100%)",
        backgroundSize: "200% 100%",
      }
    : { background: "#0057b7" };

  return (
    <div
      aria-label="Support Ukraine banner"
      className={`
        dark:border-btext-background/10
        relative z-50 w-full overflow-hidden border-b border-black/10
        transition-all duration-500 ease-out
      `}
      ref={bannerRef}
      role="banner"
      style={backgroundStyle}
    >
      <div className="container mx-auto px-4 py-4">
        <div
          className={`
            flex flex-col items-center justify-between gap-4
            md:flex-row
          `}
        >
          <div
            className={`
              flex w-full flex-col items-center gap-3
              md:w-auto md:flex-row md:gap-5
            `}
          >
            <div
              className={`
                relative mb-3 flex-shrink-0
                md:mr-5 md:mb-0
              `}
            >
              <Image
                alt="United24 Logo"
                className={`
                  block h-auto w-24 rounded-lg shadow
                  dark:hidden
                `}
                height={48}
                priority
                src="/u24.svg"
                width={96}
              />
              <Image
                alt="United24 Logo"
                className={`
                  hidden h-auto w-24 rounded-lg shadow
                  dark:block
                `}
                height={48}
                priority
                src="/u24.svg"
                width={96}
              />
            </div>
            <p
              className={`
                text-center text-sm font-semibold text-background drop-shadow-sm
                md:text-left
              `}
            >
              Stand with Ukraine. Help fund drones, medkits, and victory. Every
              dollar helps stop{" "}
              <Link
                className={`
                  underline underline-offset-4 transition-colors duration-200
                  hover:text-[#ffd700]
                `}
                href="https://war.ukraine.ua/russia-war-crimes"
                rel="noopener noreferrer"
                target="_blank"
              >
                russia's war crimes
              </Link>{" "}
              and saves lives. Donate now, it matters.
            </p>
          </div>

          <div
            className={`
              flex items-center gap-2
              md:gap-4
            `}
          >
            <Button
              asChild
              className={`
                hover:bg-btext-background hover:text-[#ffd700]
                rounded-lg bg-[#0057b7] font-bold text-[#ffd700] uppercase
              `}
            >
              <Link
                aria-label="Donate to support Ukraine"
                href="https://u24.gov.ua"
                rel="noopener noreferrer"
                target="_blank"
              >
                Donate
              </Link>
            </Button>

            {showCloseButton && (
              <Button
                aria-label="Close Ukraine support banner"
                className="rounded-full text-background shadow-none"
                onClick={handleClose}
                size="icon"
                variant="ghost"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
