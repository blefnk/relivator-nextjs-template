"use client";

import { useMemo } from "react";
import { CheckIcon } from "lucide-react";

import { cls } from "~/server/utils";
import { useToast } from "~/hooks/use-toast-1";
import { Button } from "~/islands/primitives/button";

export function Features() {
  const { toast } = useToast();

  const FEATURES = useMemo(
    () => [
      { title: "Next 13.4" },
      { title: "App Directory" },
      { title: "API Route Handlers" },
      { title: "TypeScript (Strict)" },
      { title: "ESLint + Prettier" },
      { title: "TailwindCSS" },
      { title: "Radix UI" },
      { title: "shadcn/ui" },
      { title: "Authentication" },
      { title: "Drizzle ORM" },
      { title: "Resend Email" },
      { title: "Metadata API" },
      { title: "Inter Font" },
      { title: "Jest" },
      { title: "Dark Mode" },
      {
        title: "Toasts",
        onClick: () =>
          toast({
            title: "Wait. Toasts, too?",
            description: "Yep! You can use them anywhere in your app.",
          }),
      },
      { title: "and much more..." },
    ],
    [toast],
  );

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
      {FEATURES.map((f, i) => (
        <Button
          key={i}
          variant="link"
          className={cls(
            "justify-start space-x-2 text-left underline-offset-8",
            f.onClick
              ? "cursor-pointer hover:underline"
              : "cursor-default hover:no-underline",
          )}
          onClick={() => {
            if (f.onClick) f.onClick();
          }}
        >
          <CheckIcon className="h-4 w-4" />
          <span>{f.title}</span>
        </Button>
      ))}
    </div>
  );
}

// import { features } from "~/app";
//
// import HeadingText from "~/islands/modules/heading-text";
//
// export default function Features() {
//   return (
//     <section className="container space-y-8 py-12 lg:py-20" // id="features">
//       {features.header || features.subheader ? (
//         <HeadingText subtext={features.subheader} // className="text-center">
//           {features.header}
//         </HeadingText>
//       ) : null}
//       <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//         <div className="grid grid-cols-1 gap-8">
//           {features.content.map((cards) => (
//             <div
//               key={cards.text}
//               className="flex flex-col items-center gap-2 // text-center md:flex-row md:gap-8 md:text-left"
//             >
//               {/* {cards.image !== "" ? (
//                 <div className="flex">
//                   <Image
//                     src={cards.image}
//                     className="dark:brightness-0 dark:invert-[1]"
//                     width={100}
//                     height={100}
//                     alt="Card image"
//                   />
//                 </div>
//               ) : (
//                 <></>
//               )} */}
//               <div className="flex-1">
//                 <p className="md:text4xl text-2xl font-semibold">
//                   {cards.text}
//                 </p>
//                 <p className="font-light text-muted-foreground // md:text-lg">
//                   {cards.subtext}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* <Image
//           src={heroHeader.image}
//           width={500}
//           height={500}
//           alt="Header image"
//         /> */}
//         {/* <div
//           className="md:border"
//           style={{
//             backgroundImage: `url(${features.image})`,
//             backgroundRepeat: `no-repeat`,
//             backgroundSize: `cover`,
//           }}
//         ></div> */}
//       </div>
//     </section>
//   );
// }
