import type { Metadata } from "next";

import { useTranslations } from "next-intl";

import { ContactForm } from "~/components/Forms/ContactForm";
import HeadingText from "~/components/Modules/HText";

export const metadata: Metadata = {
  description: "Send a message through email",
  keywords: "email contact, send email, feedback",
  title: "Contact",
};

export default function ContactPage() {
  const t = useTranslations();

  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="Send a message through email">
          Contact
        </HeadingText>
      </div>
      <ContactForm tSubmit={t("contact.submit")} />
    </main>
  );
}
