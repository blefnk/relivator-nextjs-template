import { Separator } from "@/components/ui/separator";

// This replacement system is still under development and may not be finalized. Please check back later.
// For now, you can use this folder to simply store files that you don't want to be overwritten during an upgrade.
export default function Onboarding() {
  return (
    <>
      <Separator className="mb-2" />
      <article
        className={`
          prose pb-8

          dark:prose-invert

          lg:prose-xl
        `}
      >
        This is the example component, which is overwritten by the file from the
        'cluster' directory. Please open the 'src/cluster/onboard.md' file to
        learn more.
      </article>
    </>
  );
}
