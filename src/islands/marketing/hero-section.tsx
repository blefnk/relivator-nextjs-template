import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { Link } from "~/navigation";
import { typography } from "~/server/text";

export function HeroSection() {
  const t = useTranslations("landing");

  const technologies = [
    { name: "Next.js 14", link: "https://nextjs.org/" },
    { name: "i18n", link: "https://tailwindcss.com/" },
    { name: "shadcn/ui", link: "https://ui.shadcn.com/" },
    { name: "App Router", link: "https://nextjs.org/docs/app" },
    { name: "TypeScript", link: "https://cutt.ly/CwjVPUNu" },
    { name: "T3 Stack", link: "https://create.t3.gg/" },
    { name: "Stripe", link: "https://stripe.com/" },
    { name: "NextAuth.js", link: "https://authjs.dev/" },
    { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
    { name: "TanStack", link: "https://tanstack.com/" },
    { name: "Drizzle", link: "https://orm.drizzle.team/" },
    { name: "Zod", link: "https://zod.dev/" },
    { name: "RSC", link: "https://cutt.ly/WwjVDQDT" },
    { name: "SWC", link: "https://swc.rs/" },
    { name: "tRPC", link: "https://trpc.io/" },
    { name: "Server Actions", link: "https://cutt.ly/awjVFfJg" },
    { name: "Lucide Icons", link: "https://lucide.dev/" },
  ];

  const technologyLinks = technologies.map((tech, index) => (
    <span key={tech.name}>
      <Link
        href={tech.link}
        target="_blank"
        rel="noopener noreferrer"
        className={typography.link}
      >
        {tech.name}
      </Link>
      {index < technologies.length - 1 ? ", " : ""}
    </span>
  ));

  return (
    <>
      <Balancer
        as="h1"
        className="mt-4 bg-gradient-to-br from-primary/60 from-10% via-primary/90 via-30% to-primary to-90% bg-clip-text font-heading text-2xl leading-[1.1] tracking-tighter text-transparent dark:from-zinc-400 dark:via-zinc-300 dark:to-zinc-600 sm:text-2xl md:text-3xl xl:text-4xl"
      >
        <span className="block max-w-5xl">{t("heading")}</span>
      </Balancer>
    </>
  );
}
