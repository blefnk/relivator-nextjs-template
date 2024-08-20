import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { CodeSwitcher } from "~/components/Account/Clerk/ClerkCodeSwitcher";
import { Footer } from "~/components/Account/Clerk/ClerkFooter";
import { LearnMore } from "~/components/Account/Clerk/ClerkLearnMore";
import { ClerkLogo } from "~/components/Account/Clerk/ClerkLogo";
import { NextLogo } from "~/components/Account/Clerk/ClerkNextLogo";
import { UserDetails } from "~/components/Account/Clerk/ClerkUserDetails";

export default async function DashboardPage() {
  const DASHBOARD_CARDS = [
    {
      description:
        "Clerk empowers you to authenticate same and cross origin requests using a Clerk generated JWT",
      href: "https://clerk.com/docs/backend-requests/overview?utm_source=vercel-template&utm_medium=partner&utm_term=JWT",
      linkText: "Request authentication",
      title: "Authenticate requests with JWT's",
    },
    {
      description:
        // eslint-disable-next-line @stylistic/max-len
        "Leverage customizable session tokens, public metadata, and Middleware to create a custom onboarding experience.",
      href: "https://clerk.com/docs/guides/add-onboarding-flow?utm_source=vercel-template&utm_medium=partner&utm_term=onboarding",
      linkText: "Onboarding flow",
      title: "Build an onboarding flow",
    },
    {
      description:
        // eslint-disable-next-line @stylistic/max-len
        "Production instances are meant to support high volumes of traffic and by default, have a more strict security posture.",
      href: "https://clerk.com/docs/deployments/overview?utm_source=vercel-template&utm_medium=partner&utm_term=deploy-to-prod",
      linkText: "Production",
      title: "Deploy to Production",
    },
  ];

  return (
    <>
      <main className="mx-auto w-full max-w-[75rem]">
        <div className="grid grid-cols-[1fr_20.5rem] gap-10 pb-10">
          <div>
            <header className="flex h-16 w-full items-center justify-between gap-4">
              <div className="flex gap-4">
                <ClerkLogo />
                <div aria-hidden className="h-6 w-px bg-[#C7C7C8]" />
                <NextLogo />
              </div>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line no-restricted-properties */}
                {process.env.NEXT_PUBLIC_ORGANIZATIONS_ENABLED === "true" && (
                  <OrganizationSwitcher
                    appearance={{
                      elements: {
                        organizationPreviewAvatarBox: "size-6",
                      },
                    }}
                  />
                )}
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-6",
                    },
                  }}
                />
              </div>
            </header>
            <UserDetails />
          </div>
          <div className="pt-14">
            <CodeSwitcher />
          </div>
        </div>
      </main>
      <LearnMore cards={DASHBOARD_CARDS} />
      <Footer />
    </>
  );
}
