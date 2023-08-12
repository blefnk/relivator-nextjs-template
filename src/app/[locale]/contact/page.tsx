import ContactForm from "~/islands/sections/pages/contact-form";
import HeadingText from "~/islands/sections/heading-text";

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="Send a message through email">
          Contact
        </HeadingText>
      </div>
      <ContactForm />
    </main>
  );
}
