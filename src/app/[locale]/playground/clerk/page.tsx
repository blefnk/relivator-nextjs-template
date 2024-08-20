import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

import { Footer } from "~/components/Account/Clerk/ClerkFooter";
import { LearnMore } from "~/components/Account/Clerk/ClerkLearnMore";
import { ClerkLogo } from "~/components/Account/Clerk/ClerkLogo";
import { NextLogo } from "~/components/Account/Clerk/ClerkNextLogo";
import { AppStatsChart } from "~/components/Charts/AppStatsChart";
import logo from "~/images/logo.png";
import signIn from "~/images/sign-in@2xrl.webp";
import signUp from "~/images/sign-up@2xrl.webp";
import screenshotDevices from "~/images/user-button@2xrl.webp";
import userButton2 from "~/images/user-button-2@2xrl.webp";
import verify from "~/images/verify@2xrl.webp";

export default function Home() {
  const t = useTranslations("landing");

  const CARDS = [
    {
      description:
        "Prebuilt components to handle essential functionality like user sign-in, sign-up, and account management.",
      href: "https://clerk.com/docs/components/overview?utm_source=vercel-template&utm_medium=partner&utm_term=component_reference",
      linkText: "Component Reference",
      title: "Customizable Components",
    },
    {
      description:
        "Build custom functionality by accessing auth state, user and session data, and more with Clerk's React Hooks.",
      href: "https://clerk.com/docs/references/react/use-user?utm_source=vercel-template&utm_medium=partner&utm_term=react_hooks",
      linkText: "React Hooks",
      title: "React Hooks",
    },
    {
      description:
        "Built for B2B SaaS: create and switch between orgs, manage and invite members, and assign custom roles.",
      href: "https://clerk.com/docs/organizations/overview?utm_source=vercel-template&utm_medium=partner&utm_term=component_reference",
      linkText: "Organizations",
      title: "Organizations",
    },
  ];

  return (
    <>
      <main className="relative bg-[#FAFAFA]">
        <h1>{t("features.auth.title")}</h1>
        <AppStatsChart />
        <div
          className={`
            row-span-3 mx-auto flex w-full max-w-[75rem] flex-col border-x
            border-[#F2F2F2] bg-white
          `}
        >
          <div
            className={`
              absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#F2F2F2]
            `}
          />
          <Image
            alt="Device"
            // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
            className={`
              absolute -top-6 left-1/2 size-64 h-[51.375rem] w-[39.0625rem]
              -translate-x-[23.75rem] bg-transparent object-contain
            `}
            src={logo}
            unoptimized
          />

          <div className="border-b border-[#F2F2F4] px-12 py-16">
            <div className="inline-flex gap-4 rounded-full bg-[#F4F4F5] px-4 py-3">
              <ClerkLogo />
              <div aria-hidden className="h-6 w-px bg-[#C7C7C8]" />
              <NextLogo />
            </div>
          </div>

          <div className="border-b border-[#F2F2F2] p-10">
            <h1
              className={`
                relative text-5xl font-bold tracking-tight text-[#131316]
              `}
            >
              <span className="font-mono text-sm">
                {t("page.reliversePlayground")}
              </span>
              Auth Provider: Clerk
            </h1>

            <p
              className={`
                relative max-w-[30rem] pb-6 pt-3 text-[1.0625rem] text-[#5E5F6E]
              `}
            >
              A simple and powerful Next.js template featuring authentication
              and user management powered by Clerk.
            </p>
            <div className="relative flex gap-3">
              <SignedIn>
                <Link
                  className={`
                    rounded-full bg-[#131316] px-4 py-2 text-sm font-semibold
                    text-white
                  `}
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button
                    className={`
                      rounded-full bg-[#131316] px-4 py-2 text-sm font-semibold
                      text-white
                    `}
                    type="button"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <Link
                className={`
                  rounded-full bg-[#F7F7F8] px-4 py-2 text-sm font-semibold
                  text-[#131316]
                `}
                href="/#features"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="flex h-[41.25rem] w-full scale-[1.03] gap-8">
            <div className="translate-y-12 space-y-8">
              <Image
                alt="Device"
                className={`
                  flex-none rounded-xl bg-white
                  shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)]
                  ring-1 ring-gray-950/5
                `}
                src={signUp}
                unoptimized
              />
            </div>
            <div className="-translate-y-4 space-y-8">
              <Image
                alt="Device"
                className={`
                  flex-none rounded-xl bg-white
                  shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)]
                  ring-1 ring-gray-950/5
                `}
                src={verify}
                unoptimized
              />
              <Image
                alt="Device"
                className={`
                  flex-none rounded-xl bg-white
                  shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)]
                  ring-1 ring-gray-950/5
                `}
                src={userButton2}
                unoptimized
              />
            </div>
            {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
            <div className="-translate-y-[22.5rem] space-y-8">
              <Image
                alt="Device"
                className={`
                  flex-none rounded-xl bg-white
                  shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)]
                  ring-1 ring-gray-950/5
                `}
                src={signIn}
                unoptimized
              />
              <Image
                alt="Device"
                className={`
                  flex-none rounded-xl bg-white
                  shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)]
                  ring-1 ring-gray-950/5
                `}
                src={screenshotDevices}
                unoptimized
              />
            </div>
          </div>
        </div>
        <div
          className={`
            absolute inset-x-0 bottom-0 h-[18.75rem] bg-gradient-to-t from-white
          `}
        />
      </main>
      <LearnMore cards={CARDS} />
      <Footer />
    </>
  );
}
