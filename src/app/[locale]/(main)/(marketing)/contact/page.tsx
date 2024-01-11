import { useTranslations } from "next-intl";

import ContactForm from "~/forms/contact-form";
import HeadingText from "~/islands/modules/heading-text";

export const metadata = {
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
