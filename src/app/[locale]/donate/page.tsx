import type { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Main } from "@/components/ui/main";
import { Paragraph } from "@/components/ui/paragraph";
import { Section } from "@/components/ui/section";

import { Sponsors } from "~/app/[locale]/donate/sponsors";

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
  return (
    <Section>
      <Heading as="h1" className="text-3xl font-bold">
        Donate to Relivator
      </Heading>
      <br />
      <Paragraph>
        Developing something as ambitious as Relivator takes a lot of time,
        especially since the project is primarily developed by just one person.
        The development could be significantly accelerated by hiring additional
        developers. Therefore, @blefnk (Nazar Kornienko), the author of this
        project, will be immensely grateful to anyone who can donate to the
        project in any amount. A big thank you to everyone in advance!
      </Paragraph>
      <Link href="/donate#sponsors">See our Sponsors</Link>
    </Section>
  );
}

function WaysToDonate() {
  return (
    <Section>
      <Heading>Ways to donate</Heading>
      <Paragraph>
        We accept donations through the following platforms.
      </Paragraph>
      <Paragraph>
        Please contact us if you would like to use a different method not listed
        here.
      </Paragraph>
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
  title,
  description,
  linkText,
  linkHref,
  content = "",
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
      <Heading>How the money is used</Heading>
      <Paragraph>
        The Relivator project uses donated money to benefit the project and the
        Relivator community as a whole.
      </Paragraph>
      <Paragraph>
        In general, we plan to spend money on the following areas each month:
      </Paragraph>
      <br />
      <Grid columns={3} gap={4}>
        {usageDetails.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <Paragraph>{item.description}</Paragraph>
            </CardContent> */}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

function DonationTiers() {
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
      <Heading>Donation tiers</Heading>
      <br />
      <Paragraph>
        We are still working on the list of what our pledges offer.
      </Paragraph>
      <Paragraph>
        You might even receive more than what's described here and on the
        donation platforms.
      </Paragraph>
      <Paragraph>
        While we accept donations of any size, we do have a tier system with
        different rewards at each level.
      </Paragraph>
      <br />
      <Grid columns={4} gap={4}>
        {tiers.map((tier, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{tier.title}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <Paragraph>{tier.description}</Paragraph>
            </CardContent> */}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

function Questions() {
  const FAQs = [
    // {
    //   question: "Are donations received by a non-profit organization?",
    //   answer:
    //     "All contributions, whether donated through ... are received by the ..., which is a 501(c)(6) non-profit organization.",
    // },
    {
      question: "Do I receive a receipt for my donation?",
      answer:
        "Yes. If you donate through any platform which offers tickets, you will receive a receipt via email. Please let us know if receipt is not received within 24 hours.",
    },

    // {
    //   question: "Are donations tax-deductible?",
    //   answer:
    //     "No. Even though the ... is a 501(c)(6) non-profit organization, the IRS doesn't consider development of open source software to be a charitable activity.",
    // },
    {
      question: "Who decides how the money is spent?",
      answer:
        "The Reliverse core team makes all decisions regarding who receives the money and how much is distributed.",
    },
    {
      question: "Is there a way to see how the money is being spent?",
      answer:
        "Yes. Please contact us if you would like to see the financial reports.",
    },
    {
      question: "Can I cancel my donation?",
      answer:
        "Yes. There is no long-term commitment. You can cancel your donation at any time by logging into the respective donation platform.",
    },
    {
      question:
        "How long does it take for my logo/avatar to appear on the site?",
      answer:
        "The logos/avatars on the Home/Donate page and GitHub are automatically updated every day so it should take no longer than 24 hours to appear.",
    },
    {
      question: "Can I update my logo/avatar or URL?",
      answer:
        "We pull the logo/avatar and URL from your donation platform profiles, depending on which site you used to donate. Please contact us if you want to set a custom logo/avatar or URL.",
    },
    {
      question:
        "Can I ask to have my logo/avatar or another detail removed/edited?",
      answer:
        "Yes. Please contact us if you would like to have your logo/avatar or any other detail removed or edited.",
    },
    {
      question: "Can I donate anonymously?",
      answer:
        "Yes. You can donate anonymously through platforms like PayPal or similar services.",
    },
    {
      question: "Can I donate in a currency other than USD?",
      answer:
        "Yes. Most donation platforms accept multiple currencies. Please check the platform you're using for more information.",
    },
    {
      question: "Can I make a one-time donation?",
      answer:
        "Yes. The easiest way to make a one-time donation is through platforms like PayPal, GitHub Sponsors, Ko-Fi, or Stripe which allow any amount.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      <br />
      <Heading>Frequently Asked Questions</Heading>
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
  return (
    <Section>
      <br />
      <Heading>Ready to build your eCommerce platform?</Heading>
      <Link
        variant="default"
        href="https://github.com/blefnk/relivator#sponsors"
      >
        Install Relivator
      </Link>
      <Link
        variant="secondary"
        href="https://github.com/blefnk/relivator#sponsors"
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
        title="Patreon"
        description="Support us on Patreon."
        linkText="Donate via Patreon"
        linkHref="https://patreon.com/blefnk"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>Exclusive updates and content</li>
        //     <li>Access to a private community</li>
        //     <li>Early access to new features</li>
        //   </ul>
        // }
      />
      <DonateCard
        title="GitHub Sponsors"
        description="Advanced features and reporting."
        linkText="Donate via GitHub Sponsors"
        linkHref="https://github.com/sponsors/blefnk"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>Donate through GitHub billing</li>
        //     <li>One-time and recurring donations</li>
        //     <li>
        //       Pay by credit card or use your existing billing relationship with
        //       GitHub (including invoicing)
        //     </li>
        //     <li>Show a “sponsor” badge on your GitHub profile</li>
        //   </ul>
        // }
      />
      <DonateCard
        title="PayPal"
        description="blefony.nazkorn@gmail.com"
        linkText="Donate via PayPal"
        linkHref="https://paypal.me/blefony"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>Instant donations</li>
        //     <li>Secure transactions</li>
        //     <li>Available worldwide</li>
        //   </ul>
        // }
      />
      <DonateCard
        title="Buy Me a Coffee"
        description="Support us with a coffee."
        linkText="Use Buy Me a Coffee"
        linkHref="https://buymeacoffee.com/blefnk"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>Small one-time donations</li>
        //     <li>Simple and fun way to support</li>
        //     <li>Easy and quick process</li>
        //   </ul>
        // }
      />
      <DonateCard
        title="Ko-Fi"
        description="Another way to buy us a coffee."
        linkText="Support on Ko-Fi"
        linkHref="https://ko-fi.com/blefnk"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>One-time donations</li>
        //     <li>Support with no fees</li>
        //     <li>Available worldwide</li>
        //   </ul>
        // }
      />
      <DonateCard
        title="Stripe"
        description="Support through Stripe."
        linkText="Support using Stripe"
        linkHref="https://donate.stripe.com/4gw4km18c8Bb4XCfYY"

        // content={
        //   <ul className="list-disc pl-5">
        //     <li>Direct support</li>
        //     <li>Recurring and one-time donations</li>
        //     <li>Secure transactions</li>
        //   </ul>
        // }
      />
    </CardGrid>
  );
}
