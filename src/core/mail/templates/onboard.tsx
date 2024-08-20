import Image from "next/image";

import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Tailwind } from "@react-email/tailwind";
import { useTranslations } from "next-intl";

export default function Onboard({ firstName = "FirstName" }) {
  const t = useTranslations();

  return (
    <Html>
      <Head />
      <Tailwind>
        <Img
          alt="Relivator Logo"
          src="https://relivator.reliverse.org/logo.png"
        />
        <p className="text-2xl">Welcome {firstName}, </p>
        <p className="text-lg">
          Ready to revolutionize the web development journey? the decision to
          join us at our Relivator introduction event on the "Bleverse Conf:
          Spring 2024" is the first step towards mastering Next.js 15 and
          beyond. We're excited to unveil the capabilities and innovations of
          Relivator to you.
        </p>
        <ul>
          <li>
            <span className="font-bold">
              {t("onboard.relivatorNextJsRedefined")}
            </span>
            <br />
            Dive into the advanced features of Relivator, including its seamless
            integration with Stripe, responsive Tailwind design, and powerful
            Drizzle ORM for database management.
          </li>
          <li>
            <span className="font-bold">
              💡 Mastering Modern Web Development:
            </span>
            <br />
            Learn how Relivator leverages React 19 and Next.js 15 to provide an
            enhanced development experience, from server components to advanced
            hooks.
          </li>
          <li>
            <span className="font-bold">
              🌐 Seamless Database and Authentication Integration:
            </span>
            <br />
            Discover how Relivator simplifies the integration of databases
            (MySQL and PostgreSQL) and authentication systems (NextAuth.js and
            Clerk), tailoring them to the project’s needs.
          </li>
          <li>
            <span className="font-bold">
              🎨 Crafting Aesthetic UI with Ease:
            </span>
            <br />
            Explore the elegant and functional UI components built on top of
            Flowbite and Shadcn UI, styled with Radix and Tailwind CSS for a
            modern aesthetic.
          </li>
        </ul>
        <h4>{t("onboard.eventDetails")} </h4>
        <ul>
          <li>{t("onboard.dateEventDateTbd")}</li>
          <li>{t("onboard.timeEventTimeTbd")}</li>
          <li>{t("onboard.locationEventLinkTbd")}</li>
          <li>{t("onboard.donTMissOutReserveTheSpotNow")}</li>
          <li>{t("onboard.tbdToBeDetermined")}</li>
        </ul>
        <button
          className={`
            mx-auto w-fit rounded-2xl bg-blue-600 px-6 py-2 text-xl font-bold
            text-white
          `}
          type="button"
        >
          Join Event
        </button>
        <p className="text-center">
          {t("onboard.join15MinutesEarlyToNetwork")}
        </p>
        <p>
          Embark on a transformative journey with Relivator, Bleverse, and with
          our friends and partners. This event is not just an introduction, it's
          a gateway to the future of web development.
          <br />
          <br />
          We're thrilled to have you with us on this adventure.
          <br />
          <br />
          Warm Regards,
          <br />
          <br />
          Nazar Kornienko <br /> Reliverse & Bleverse Creator
        </p>
      </Tailwind>
    </Html>
  );
}

export function OnboardSample({ firstName = "FirstName" }) {
  const t = useTranslations();

  return (
    <div className="mx-auto mt-10 max-w-[500px]">
      <Image
        alt="Relivator Logo"
        height={150}
        src="https://relivator.reliverse.org/logo.png"
        width={500}
      />
      <a href="/page">{t("onboard.asa")}</a>
      <p className="text-2xl">Hello {firstName}, welcome to Relivator!</p>
      <p className="text-lg">
        We're excited to introduce you to the world of advanced web development
        with Relivator. It's a game-changer!
      </p>
    </div>
  );
}
