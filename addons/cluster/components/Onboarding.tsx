import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Tailwind } from "@react-email/tailwind";

// This replacement system is still under development and may not be finalized. Please check back later.
// For now, you can use this folder to simply store files that you don't want to be overwritten during an upgrade.
export default function Onboarding() {
  return (
    <>
      <Separator className="mb-2" />
      <article
        className={`
          prose max-w-screen-lg pb-8

          dark:prose-invert

          lg:prose-xl
        `}
      >
        <h1 className="mb-4 text-2xl font-bold">
          Welcome to the Cluster Directory Onboarding!
        </h1>
        <p>
          Hello! This is an example custom component in the
          'addons\cluster\reliverse\components\Onboarding.tsx' directory. Please
          open 'Onboarding.tsx' and the 'Onboarding.md' file to lean more.
          Original file is located at 'src/components/Emails/Onboarding.tsx'.
        </p>
        {/* <h2 className="mt-6 text-xl font-semibold">Getting Started:</h2>
        <ol className="ml-6 mt-2 list-decimal">
          <li>
            Open the 'Onboarding.md' file to get an overview of the onboarding
            process. Edit 'src/cluster/Onboarding.tsx' file.
          </li>
          <li>
            Follow the instructions in the 'README.md' and 'Onboard.md' file to
            complete the initial setup.
          </li>
        </ol> */}
        <h2 className="mb-4 mt-6 text-xl font-semibold">
          README.md RQA (Reliverse Questions Answers) (FAQ):
        </h2>
        <p className="mb-4 font-bold text-primary/90">
          Reliverse has prepared 30+ interesting questions and answers for you,
          like the ones below. Just find the appropriate section in the
          README.md file and enjoy!
        </p>
        <p>
          RQ29: Should I modify the components by
          [shadcn/ui](https://ui.shadcn.com) (as of Relivator 1.2.6, they are
          located in the "addons/components/ui" folder)? RA29: You may lose your
          changes if @shadcn or
          [Reliverse](https://github.com/orgs/reliverse/repositories) update any
          of these components in the release of Relivator 1.3.x+. Therefore, the
          best option currently is to use, for example, the
          "addons/cluster/reliverse/shadcn/ui" folder, where you can have files
          that you can safely overwrite the original files with, ensuring you do
          not lose your changes. As an example, this folder already contains a
          `cluster-readme.tsx` file, which only re-exports the original
          `button.tsx` file. So, you can create a `button.tsx` file here and
          copy and paste that line into your newly created file. Alternatively,
          you can duplicate the code from the original file and make any
          modifications you want. Use `Cmd/Ctrl+Shift+H` and simply replace
          `addons/components/ui` with `addons/cluster/reliverse/shadcn/ui` (the
          difference is only in the words "browser" and "cluster").
          `addons/cluster` is your house; feel free to do anything you want
          here, mess it up or tidy it up as you wish. This is your own house,
          and no one has the right to take it away from you.
        </p>
        <br />
        <p>
          RA29: You may lose your changes if @shadcn or
          [Reliverse](https://github.com/orgs/reliverse/repositories) update any
          of these components in the release of Relivator 1.3.x+. Therefore, the
          best option currently is to use, for example, the
          "addons/cluster/reliverse/shadcn/ui" folder, where you can have files
          that you can safely overwrite the original files with, ensuring you do
          not lose your changes. As an example, this folder already contains a
          `cluster-readme.tsx` file, which only re-exports the original
          `button.tsx` file. So, you can create a `button.tsx` file here and
          copy and paste that line into your newly created file. Alternatively,
          you can duplicate the code from the original file and make any
          modifications you want. Use `Cmd/Ctrl+Shift+H` and simply replace
          `addons/components/ui` with `addons/cluster/reliverse/shadcn/ui` (the
          difference is only in the words "browser" and "cluster").
          `addons/cluster` is your house; feel free to do anything you want
          here, mess it up or tidy it up as you wish. This is your own house,
          and no one has the right to take it away from you.
        </p>
      </article>
    </>
  );
}

export function Onboard({ firstName = "FirstName" }) {
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
        <h4>Event Details: </h4>
        <ul>
          <li>Date: [Event Date (TBD)]</li>
          <li>Time: [Event Time (TBD)]</li>
          <li>Location: [Event Link (TBD)]</li>
          <li>Don't miss out, reserve the spot now!</li>
          <li>*TBD - To Be Determined</li>
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
          Nazar Kornienko <br /> Reliverse & Bleverse Creator
        </p>
      </Tailwind>
    </Html>
  );
}

export function OnboardSample({ firstName = "FirstName" }) {
  return (
    <div className="mx-auto mt-10 max-w-[500px]">
      <Image
        alt="Relivator Logo"
        height={150}
        src="https://relivator.reliverse.org/logo.png"
        width={500}
      />
      <a href="/page">asa</a>
      <p className="text-2xl">Hello {firstName}, welcome to Relivator!</p>
      <p className="text-lg">
        We're excited to introduce you to the world of advanced web development
        with Relivator. It's a game-changer!
      </p>
    </div>
  );
}
