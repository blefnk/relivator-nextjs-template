import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { config } from "@reliverse/core";
import { useTranslations } from "next-intl";

import { env } from "~/env";

type NewsletterWelcomeEmailProps = {
  firstName?: string;
  fromEmail: string;
  token: string;
};

const newsletterImages = [
  {
    alt: "Developer working on a project: crop unrecognizable man using laptop in darkness",
    credit: "Sora Shimazaki",
    creditUrl:
      "https://pexels.com/photo/crop-unrecognizable-man-using-laptop-in-darkness-5926397",
    description: // eslint-disable-next-line @stylistic/max-len
      "Development is an ever-evolving field. It's not just about coding, but also about the innovations and community that drive it. So we decided to create a newsletter to share our passion with others who love development as much as we do! © blefnk",
    src: `${env.NEXT_PUBLIC_APP_URL}/images/newsletter/developer-one.webp`,
  },
  {
    alt: "Coding session: data codes through eyeglasses",
    credit: "Kevin Ku",
    creditUrl: "https://pexels.com/photo/data-codes-through-eyeglasses-577585",
    description: // eslint-disable-next-line @stylistic/max-len
      "We'll be keeping you up-to-date with the latest development news, trends, and more. Stay up-to-date with the latest innovations and best practices. Stay tuned for more! © blefnk",
    src: `${env.NEXT_PUBLIC_APP_URL}/images/newsletter/developer-two.webp`,
  },
];

export default function NewsletterWelcomeEmail({
  firstName = "there",
  fromEmail = "blefnk@gmail.com",
  token,
}: NewsletterWelcomeEmailProps) {
  const t = useTranslations();

  const previewText = `Hi, ${firstName}! Welcome to Reliverse Weekly! 👋`;

  return (
    <Html>
      <Head>
        <title>{t("NewsletterWelcomeEmail.reliverseWeeklyNewsletter")}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-zinc-950">
                Reliverse Weekly
              </Heading>
              <Hr className="my-4" />
              <Heading className="text-center text-3xl font-semibold text-zinc-800">
                Welcome to Reliverse Weekly!
              </Heading>
              <Text className="mb-0 mt-6 text-center text-base">
                Hi {firstName}, thank you for subscribing to Reliverse Weekly!
                We're so glad you're here and excited to share our passion for
                development with you.
              </Text>
              <Text className="m-0 text-center text-base">
                We'll be sending you a newsletter every week, packed with the
                latest development news, trends, and best practices.
              </Text>
              <Text className="m-0 text-center text-base">
                This newsletter will cover a range of topics including web
                development, game development, and other fascinating subjects
                from the tech world.
              </Text>
              <Text className="m-0 mt-4 text-center text-base">
                As a subscriber, you'll get exclusive insights, tips, and
                resources to help you stay ahead in your development journey.
              </Text>
            </Section>
            <Section className="mt-6">
              {newsletterImages.map((item) => (
                <Row className="mt-10" key={item.alt}>
                  <Img
                    alt={item.alt}
                    className="aspect-video w-full object-cover"
                    height={424}
                    src={item.src}
                  />
                  <Text className="mb-0 mt-2 text-center text-zinc-400">
                    Photo by{" "}
                    <Link
                      className="text-blue-500 underline"
                      href={item.creditUrl}
                    >
                      {item.credit}
                    </Link>
                  </Text>
                  <Text className="mb-0 mt-4 text-center text-base">
                    {item.description}
                  </Text>
                </Row>
              ))}
            </Section>
            <Section className="mt-6 text-center">
              <Heading className="text-xl font-semibold text-zinc-800">
                Get Involved!
              </Heading>
              <Text className="m-0 text-center text-base">
                We would love to hear from you! If you have any suggestions,
                questions, or topics you'd like us to cover, feel free to reach
                out to us.
              </Text>
              <Text className="m-0 text-center text-base">
                Connect with us on social media and join our community of
                passionate developers.
              </Text>
              <Row className="mt-4 flex justify-center space-x-4">
                <Link
                  className="text-blue-500 underline"
                  href={config.social.github}
                >
                  @blefnk (GitHub)
                </Link>
                <Link
                  className="text-blue-500 underline"
                  href="https://github.com/reliverse"
                >
                  @reliverse (GitHub)
                </Link>
                <Link
                  className="text-blue-500 underline"
                  href={config.social.twitter}
                >
                  Twitter
                </Link>
                <Link
                  className="text-blue-500 underline"
                  href={config.social.linkedin}
                >
                  LinkedIn
                </Link>
              </Row>
            </Section>
            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                We're looking forward to seeing you around! If you have any
                questions, please don't hesitate to reach out to us at{" "}
                <Link
                  className="text-blue-500 underline"
                  href={`mailto:${fromEmail}`}
                >
                  {fromEmail}
                </Link>
              </Text>
              <Text className="mb-0 mt-4">
                @ Reliverse Weekly {new Date().getFullYear()}
              </Text>
              <Text className="m-0">
                If you no longer want to receive these emails, you can{" "}
                <Link
                  className="text-blue-500 underline"
                  href={`${env.NEXT_PUBLIC_APP_URL}/user/preferences/email?token=${token}`}
                >
                  unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
