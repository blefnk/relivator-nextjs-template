import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { siteConfig } from "~/app";

export type SignInEmailProps = {
  existingUser?: boolean;
  emailAddress: string;
  url: string;
};

export default function SignInEmail({
  url,
  emailAddress,
  existingUser = false,
}: SignInEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {existingUser
          ? `Sign in to ${siteConfig.name}`
          : `Welcome to ${siteConfig.name}!`}
      </Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 mb-[10px] mt-[32px] p-0 text-center text-[12px] font-bold uppercase tracking-widest text-zinc-400">
              {siteConfig.name}
            </Heading>
            <Heading className="mx-0 mb-[30px] mt-0 p-0 text-center text-[24px] font-normal text-black">
              <span className="font-bold">
                {existingUser ? "Sign in" : "Welcome"}
              </span>{" "}
              to <span className="font-bold">{siteConfig.name}</span>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              {existingUser ? (
                <>
                  Welcome back to {siteConfig.name}. Tap this button to sign in
                  to your account:
                </>
              ) : (
                <>
                  Thanks for trying {siteConfig.name}. We&apos;re thrilled to
                  have you on board. To get started, tap this button to verify
                  your email address:
                </>
              )}
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                pX={20}
                pY={12}
                className="rounded bg-[#000000] text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                {existingUser ? "Sign in to my account" : "Verify my email"}
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{emailAddress}</span>. If you were
              not expecting this invitation, you can ignore this email. If you
              are concerned about your account&apos;s safety, please reply to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
