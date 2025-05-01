"use client";

import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface United24BannerProps {
  onClose?: () => void;
  showCloseButton?: boolean;
  animateGradient?: boolean;
}

const United24Banner: React.FC<United24BannerProps> = ({
  onClose,
  showCloseButton = true,
  animateGradient = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<ReturnType<typeof animate>[]>([]);

  const handleClose = () => {
    if (bannerRef.current) {
      // Stop any existing animations
      for (const animation of animationsRef.current) {
        animation.pause();
      }

      // Create close animation
      const animation = animate(bannerRef.current, {
        opacity: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 500,
        ease: "outQuad",
        onComplete: () => {
          setIsVisible(false);
          if (onClose) {
            onClose();
          }
        },
      });

      // Store the animation reference
      animationsRef.current = [animation];
    }
  };

  useEffect(() => {
    if (!isVisible || !bannerRef.current) return;

    // Clear previous animations
    for (const animation of animationsRef.current) {
      animation.pause();
    }

    // Initialize new animations
    const animations: ReturnType<typeof animate>[] = [];
    const banner = bannerRef.current;

    // Get elements within the banner
    const contentElements = banner.querySelectorAll(".banner-content");
    const logoElements = banner.querySelectorAll(".banner-logo");
    const buttonElements = banner.querySelectorAll(".banner-button");

    // Entrance animation for content
    const contentAnimation = animate(contentElements, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      ease: "outExpo",
      delay: (_, i) => i * 100, // Stagger effect
    });
    animations.push(contentAnimation);

    // Logo animation
    const logoAnimation = animate(logoElements, {
      scale: [0.8, 1],
      opacity: [0, 1],
      rotate: ["-15deg", "0deg"],
      duration: 1000,
      ease: "outElastic(1, 0.5)",
    });
    animations.push(logoAnimation);

    // Button animation
    const buttonAnimation = animate(buttonElements, {
      opacity: [0, 0.9],
      duration: 200,
      delay: 100,
      ease: "outExpo",
    });
    animations.push(buttonAnimation);

    // Ukrainian flag color gradient animation
    if (animateGradient) {
      const gradientAnimation = animate(banner, {
        backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
        duration: 45000,
        ease: "linear",
        loop: true,
      });
      animations.push(gradientAnimation);
    }

    // Store animations for cleanup
    animationsRef.current = animations;

    return () => {
      // Clean up all animations when component unmounts
      for (const anim of animations) {
        anim.pause();
      }
    };
  }, [isVisible, animateGradient]);

  if (!isVisible) return null;

  // Generate background classes or styles based on gradient animation and theme
  const bannerClasses = `w-full shadow-md relative z-50 overflow-hidden banner-gradient-bg ${
    !animateGradient ? "bg-[#ffd700] dark:bg-[#0057b7]" : ""
  }`;

  // Determine the background style based on animateGradient prop
  const backgroundStyle = animateGradient
    ? {
        background:
          "linear-gradient(90deg, #0057b7 0%, #0057b7 40%, #ffd700 60%, #ffd700 100%)",
        backgroundSize: "200% 100%",
      }
    : {};

  // Dynamic button class based on gradient animation state
  const buttonClasses = animateGradient
    ? "banner-button bg-[#0057b7] text-[#ffd700] font-bold py-2 px-6 rounded hover:bg-white hover:text-[#0057b7] uppercase shadow-md opacity-90 hover:opacity-100 transition-opacity duration-300"
    : "banner-button bg-[#0057b7] dark:bg-[#ffd700] hover:bg-white dark:hover:bg-white text-[#ffd700] dark:text-blue-800 hover:text-[#0057b7] font-bold py-2 px-6 rounded uppercase shadow-md opacity-90 hover:opacity-100 transition-opacity duration-300";

  // Text color classes based on theme and gradient state
  const textColorClasses = animateGradient
    ? "text-white"
    : "text-blue-800 dark:text-white";

  return (
    <div
      ref={bannerRef}
      className={bannerClasses}
      style={backgroundStyle}
      role="banner"
      aria-label="Support Ukraine banner"
    >
      <div
        className={`
          container mx-auto flex flex-col items-center justify-between px-4 py-4
          md:flex-row
        `}
      >
        <div
          className={`
            banner-content mb-4 flex flex-col items-center
            md:mb-0 md:flex-row
          `}
        >
          <div
            className={`
              banner-logo relative mb-3 flex-shrink-0
              md:mr-5 md:mb-0
            `}
          >
            {/* Use Image component with different sources based on theme */}
            <Image
              src="/u24.svg"
              alt="United24 Logo"
              width={96}
              height={48}
              priority
              className={`
                block h-auto w-24 rounded
                dark:hidden
              `}
            />
            <Image
              src="/u24_white.svg"
              alt="United24 Logo"
              width={96}
              height={48}
              priority
              className={`
                hidden h-auto w-24 rounded
                dark:block
              `}
            />
          </div>
          <p
            className={`
              banner-content text-center font-semibold
              md:text-left
              ${textColorClasses}
            `}
          >
            Stand with Ukraine. Help fund drones, medkits, and victory. Every
            dollar helps stop{" "}
            <Link
              href="https://war.ukraine.ua/russia-war-crimes"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              russia's war crimes
            </Link>{" "}
            and saves lives. Donate now, it matters.
          </p>
        </div>

        <div className="banner-content flex items-center">
          <Link
            href="https://u24.gov.ua"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
            aria-label="Donate to support Ukraine"
          >
            Donate
          </Link>

          {showCloseButton && (
            <button
              onClick={handleClose}
              aria-label="Close Ukraine support banner"
              type="button"
              className={`
                banner-content ml-4 opacity-80 transition-opacity
                focus:ring-opacity-50 focus:ring-2 focus:ring-current
                focus:outline-none
                hover:opacity-100
                ${textColorClasses}
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <title>Close</title>
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default United24Banner;
