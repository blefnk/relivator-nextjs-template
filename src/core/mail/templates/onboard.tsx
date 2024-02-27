import React from "react";
import Image from "next/image";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Preview } from "@react-email/preview";
import { Tailwind } from "@react-email/tailwind";

export default function Onboard({ firstName }: any) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Img
          src="https://relivator.bleverse.com/logo.png"
          alt="Relivator Logo"
        />
        <p className="text-2xl">Welcome {firstName}, </p>
        <p className="text-lg">
          Ready to revolutionize your web development journey? Your decision to
          join us at our Relivator introduction event on the "Bleverse Conf:
          Spring 2024" is your first step towards mastering Next.js 14 and
          beyond. We're excited to unveil the capabilities and innovations of
          Relivator to you.
        </p>
        <ul>
          <li>
            <span className="font-bold">🚀 Relivator - Next.js Redefined:</span>
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
            Learn how Relivator leverages React 18 and Next.js 14 to provide an
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
            Clerk), tailoring them to your project’s needs.
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

        <h4>Event Details: </h4>
        <ul>
          <li>Date: [Event Date (TBD)]</li>
          <li>Time: [Event Time (TBD)]</li>
          <li>Location: [Event Link (TBD)]</li>
          <li>Don't miss out, reserve your spot now!</li>
          <li>*TBD - To Be Determined</li>
        </ul>
        <button
          type="button"
          className="mx-auto w-fit rounded-2xl bg-blue-600 px-6 py-2 text-xl font-bold text-white"
        >
          Join Event
        </button>
        <p className="text-center">🌟 Join 15 minutes early to network! 🌟</p>
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
          Nazarii Korniienko <br /> Bleverse CEO
        </p>
      </Tailwind>
    </Html>
  );
}

export function OnboardSample({ firstName = "FIRSTNAME" }: any) {
  return (
    <div className="mx-auto mt-10 max-w-[500px]">
      <Image
        src="https://relivator.bleverse.com/logo.png"
        alt="Relivator Logo"
        width={500}
        height={150}
      />
      <p className="text-2xl">Hello {firstName}, welcome to Relivator!</p>
      <p className="text-lg">
        We're excited to introduce you to the world of advanced web development
        with Relivator. It's a game-changer!
      </p>
    </div>
  );
}
