import { Balancer } from "react-wrap-balancer";

import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations();

  // const technologies = [
  //   { link: "https://nextjs.org/", name: "Next.js 15" },
  //   { link: "https://tailwindcss.com/", name: "i18n" },
  //   { link: "https://ui.shadcn.com/", name: "shadcn/ui" },
  //   { link: "https://nextjs.org/docs/app", name: "App Router" },
  //   { link: "https://cutt.ly/CwjVPUNu", name: "TypeScript" },
  //   { link: "https://create.t3.gg/", name: "T3 Stack" },
  //   { link: "https://stripe.com/", name: "Stripe" },
  //   { link: "https://authjs.dev/", name: "NextAuth.js" },
  //   { link: "https://tailwindcss.com/", name: "Tailwind CSS" },
  //   { link: "https://tanstack.com/", name: "TanStack" },
  //   { link: "https://orm.drizzle.team/", name: "Drizzle" },
  //   { link: "https://zod.dev/", name: "Zod" },
  //   { link: "https://cutt.ly/WwjVDQDT", name: "RSC" },
  //   { link: "https://swc.rs/", name: "SWC" },
  //   { link: "https://trpc.io/", name: "tRPC" },
  //   { link: "https://cutt.ly/awjVFfJg", name: "Server Actions" },
  //   { link: "https://lucide.dev/", name: "Lucide Icons" },
  // ];
  // const technologyLinks = technologies.map((tech, index) => (
  //   <span key={tech.name}>
  //     <Link className={typography.link} href={tech.link} rel="noopener noreferrer" target="_blank">
  //       {tech.name}
  //     </Link>
  //     {index < technologies.length - 1 ? ", " : ""}
  //   </span>
  // ));
  return (
    <Balancer
      as="h1"
      className={`
        mt-4 bg-gradient-to-br from-primary/60 from-10% via-primary/90 via-30%
        to-primary to-90% bg-clip-text text-2xl font-medium leading-[1.1]
        tracking-tighter text-transparent

        dark:from-zinc-400 dark:via-zinc-300 dark:to-zinc-600

        md:text-3xl

        sm:text-2xl

        xl:text-4xl
      `}
    >
      <span className="block max-w-5xl">{t("metadata.description")}</span>
    </Balancer>
  );
}
