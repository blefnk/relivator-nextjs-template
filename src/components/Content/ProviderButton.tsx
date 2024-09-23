import { Loader2 } from "lucide-react";

import { Button } from "~/components/ui/button";

type ProviderButtonProps = {
  loading: boolean;
  provider: string;
  tPleaseWait: string;
  onClick: () => void;
};

export default function ProviderButton({
  loading,
  onClick,
  provider,
  tPleaseWait,
}: ProviderButtonProps) {
  return (
    <div // @ts-expect-error TODO: fix
      key={provider.id}
      className="flex w-full flex-row items-baseline justify-center gap-2"
    >
      <Button
        className={`
          flex max-w-lg flex-1 items-center gap-3 rounded-full bg-zinc-50 px-4
          py-5 text-lg font-semibold text-zinc-900 shadow-md transition

          dark:bg-zinc-900 dark:text-zinc-300

          ${loading ? "cursor-not-allowed opacity-50" : ""}
        `}
        disabled={loading}
        variant="outline"
        onClick={onClick}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            {tPleaseWait}
          </>
        ) : (
          <>
            {/* <renderProviderIcon provider={provider.name} /> */}
            {/* // @ts-expect-error TODO: fix */}
            {String(provider)}
          </>
        )}
      </Button>
    </div>
  );
}
