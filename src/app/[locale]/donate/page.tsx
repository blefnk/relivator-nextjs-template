import type { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

import { useTranslations } from "next-intl";

import { Sponsors } from "~/app/[locale]/donate/sponsors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Grid } from "~/components/ui/grid";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { Main } from "~/components/ui/main";
import { Section } from "~/components/ui/section";

/* eslint-disable @stylistic/max-len */
export default function DonatePage() {
  return (
    <Main>
      <PageDescription />
      <WaysToDonate />
      <DonateCards />
      <br />
      <br />
      <Sponsors />
      <DonationTiers />
      <UsageDetails />
      <Questions />
      <GetStarted />
    </Main>
  );
}

function PageDescription() {
  const t = useTranslations();

  return (
    <Section>
      <Heading className="text-3xl font-bold" as="h1">
        Donate to Relivator
      </Heading>
      <br />
      <Balancer as="p">
        <span className="text-base">
          Developing something as ambitious as Relivator takes a lot of time,
          especially since the project is primarily developed by just one
          person. The development could be significantly accelerated by hiring
          additional developers. Therefore, @blefnk (Nazar Kornienko), the
          author of this project, will be immensely grateful to anyone who can
          donate to the project in any amount. A big thank you to everyone in
          advance!
        </span>
      </Balancer>
      <Link href="/donate#sponsors">{t("page.seeOurSponsors")}</Link>
    </Section>
  );
}

function WaysToDonate() {
  const t = useTranslations();

  return (
    <Section>
      <Heading>{t("page.waysToDonate")}</Heading>
      <Balancer as="p">
        We accept donations through the following platforms.
      </Balancer>
      <Balancer as="p">
        Please contact us if you would like to use a different method not listed
        here.
      </Balancer>
    </Section>
  );
}

function CardGrid({ children }: { children: ReactNode }) {
  return (
    <Grid columns={3} gap={4}>
      {children}
    </Grid>
  );
}

type DonateCardProps = {
  content?: ReactNode;
  description: string;
  linkHref: string;
  linkText: string;
  title: string;
};

function DonateCard({
  content = "",
  description,
  linkHref,
  linkText,
  title,
}: DonateCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>
        <Link href={linkHref}>{linkText}</Link>
      </CardFooter>
    </Card>
  );
}

function UsageDetails() {
  const t = useTranslations();

  const usageDetails = [
    {
      title: "Team Development",
    },
    {
      title: "Contributor Pool",
    },
    {
      title: "Dependencies",
    },
    {
      title: "Community Projects",
    },
    {
      title: "Support Systems",
    },
    {
      title: "Marketing",
    },
    {
      title: "Research",
    },
    {
      title: "Legal Related",
    },
    {
      title: "Miscellaneous",
    },
  ];

  return (
    <Section>
      <Heading>{t("page.howTheMoneyIsUsed")}</Heading>
      <Balancer as="p">
        The Relivator project uses donated money to benefit the project and the
        Relivator community as a whole.
      </Balancer>
      <Balancer as="p">
        In general, we plan to spend money on the following areas each month:
      </Balancer>
      <br />
      <Grid columns={3} gap={4}>
        {usageDetails.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <Balancer as="p">{item.description}</Balancer>
            </CardContent> */}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

function DonationTiers() {
  const t = useTranslations();

  const tiers = [
    {
      title: "Platinum Sponsor",

      // title: "Platinum Sponsor ($...+ per month)",
      // description: "The most highest logo placement on homepage and readme.",
    },
    {
      title: "Gold Sponsor",

      // description: "Second highest logo placement on homepage and readme.",
    },
    {
      title: "Silver Sponsor",

      // description: "Third highest logo placement on homepage and readme.",
    },
    {
      title: "Bronze Sponsor",

      // description: "Fourth highest logo placement on homepage and readme.",
    },
  ];

  return (
    <Section>
      <Heading>{t("page.donationTiers")}</Heading>
      <br />
      <Balancer as="p">
        We are still working on the list of what our pledges offer.
      </Balancer>
      <Balancer as="p">
        You might even receive more than what's described here and on the
        donation platforms.
      </Balancer>
      <Balancer as="p">
        While we accept donations of any size, we do have a tier system with
        different rewards at each level.
      </Balancer>
      <br />
      <Grid columns={4} gap={4}>
        {tiers.map((tier, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{tier.title}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <Balancer as="p">{tier.description}</Balancer>
            </CardContent> */}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

function Questions() {
  const t = useTranslations();

  const FAQs = [
    // {
    //   question: "Are donations received by a non-profit organization?",
    //   answer:
    //     "All contributions, whether donated through ... are received by the ..., which is a 501(c)(6) non-profit organization.",
    // },
    {
      answer:
        "Yes. If you donate through any platform which offers tickets, you will receive a receipt via email. Please let us know if receipt is not received within 24 hours.",
      question: "Do I receive a receipt for my donation?",
    },

    // {
    //   question: "Are donations tax-deductible?",
    //   answer:
    //     "No. Even though the ... is a 501(c)(6) non-profit organization, the IRS doesn't consider development of open source software to be a charitable activity.",
    // },
    {
      answer:
        "The Reliverse core team makes all decisions regarding who receives the money and how much is distributed.",
      question: "Who decides how the money is spent?",
    },
    {
      answer:
        "Yes. Please contact us if you would like to see the financial reports.",
      question: "Is there a way to see how the money is being spent?",
    },
    {
      answer:
        "Yes. There is no long-term commitment. You can cancel your donation at any time by logging into the respective donation platform.",
      question: "Can I cancel my donation?",
    },
    {
      answer:
        "The logos/avatars on the Home/Donate page and GitHub are automatically updated every day so it should take no longer than 24 hours to appear.",
      question:
        "How long does it take for my logo/avatar to appear on the site?",
    },
    {
      answer:
        "We pull the logo/avatar and URL from your donation platform profiles, depending on which site you used to donate. Please contact us if you want to set a custom logo/avatar or URL.",
      question: "Can I update my logo/avatar or URL?",
    },
    {
      answer:
        "Yes. Please contact us if you would like to have your logo/avatar or any other detail removed or edited.",
      question:
        "Can I ask to have my logo/avatar or another detail removed/edited?",
    },
    {
      answer:
        "Yes. You can donate anonymously through platforms like PayPal or similar services.",
      question: "Can I donate anonymously?",
    },
    {
      answer:
        "Yes. Most donation platforms accept multiple currencies. Please check the platform you're using for more information.",
      question: "Can I donate in a currency other than USD?",
    },
    {
      answer:
        "Yes. The easiest way to make a one-time donation is through platforms like PayPal, GitHub Sponsors, Ko-Fi, or Stripe which allow any amount.",
      question: "Can I make a one-time donation?",
    },
  ];

  return (
    <Accordion className="w-full" type="single" collapsible>
      <br />
      <Heading>{t("page.frequentlyAskedQuestions")}</Heading>
      {FAQs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function GetStarted() {
  const t = useTranslations();

  return (
    <Section>
      <br />
      <Heading>{t("page.readyToBuildYourEcommercePlatform")}</Heading>
      <Link href="https://reliverse.org/relivator" variant="default">
        Install Relivator
      </Link>
      <Link
        href="https://github.com/blefnk/relivator#sponsors"
        variant="secondary"
      >
        Become a Sponsor
      </Link>
    </Section>
  );
}

function DonateCards() {
  return (
    <CardGrid>
      <DonateCard
        description="Support us on Patreon."
        linkHref="https://patreon.com/blefnk"
        linkText="Donate via Patreon"
        title="Patreon"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>{t("page.exclusiveUpdatesAndContent")}</li>
        //     <li>{t("page.accessToAPrivateCommunity")}</li>
        //     <li>{t("page.earlyAccessToNewFeatures")}</li>
        //   </ul>
        // }
      />
      <DonateCard
        description="Advanced features and reporting."
        linkHref="https://github.com/sponsors/blefnk"
        linkText="Donate via GitHub Sponsors"
        title="GitHub Sponsors"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>{t("page.donateThroughGithubBilling")}</li>
        //     <li>{t("page.oneTimeAndRecurringDonations")}</li>
        //     <li>
        //       Pay by credit card or use your existing billing relationship with
        //       GitHub (including invoicing)
        //     </li>
        //     <li>{t("page.showASponsorBadgeOnYourGithubProfile")}</li>
        //   </ul>
        // }
      />
      <DonateCard
        description="blefony.nazkorn@gmail.com"
        linkHref="https://paypal.me/blefony"
        linkText="Donate via PayPal"
        title="PayPal"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>{t("page.instantDonations")}</li>
        //     <li>{t("page.secureTransactions")}</li>
        //     <li>{t("page.availableWorldwide")}</li>
        //   </ul>
        // }
      />
      <DonateCard
        description="Support us with a coffee."
        linkHref="https://buymeacoffee.com/blefnk"
        linkText="Use Buy Me a Coffee"
        title="Buy Me a Coffee"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>{t("page.smallOneTimeDonations")}</li>
        //     <li>{t("page.simpleAndFunWayToSupport")}</li>
        //     <li>{t("page.easyAndQuickProcess")}</li>
        //   </ul>
        // }
      />
      <DonateCard
        description="Another way to buy us a coffee."
        linkHref="https://ko-fi.com/blefnk"
        linkText="Support on Ko-Fi"
        title="Ko-Fi"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>{t("page.oneTimeDonations")}</li>
        //     <li>{t("page.supportWithNoFees")}</li>
        //     <li>{t("page.availableWorldwide")}</li>
        //   </ul>
        // }
      />
      <DonateCard
        description="Support through Stripe."
        linkHref="https://donate.stripe.com/4gw4km18c8Bb4XCfYY"
        linkText="Support using Stripe"
        title="Stripe"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>{t("page.directSupport")}</li>
        //     <li>{t("page.recurringAndOneTimeDonations")}</li>
        //     <li>{t("page.secureTransactions")}</li>
        //   </ul>
        // }
      />
    </CardGrid>
  );
}
