"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";
import Link from "next-intl/link";

import { cn } from "~/server/utils";
import { Button, buttonVariants } from "~/islands/primitives/button";
import { Separator } from "~/islands/primitives/separator";

// todo: migrate to useHooks: useCopyToClipboard
// todo: https://usehooks.com/usecopytoclipboard

// temp const, just for testing purposes
// const randomHash = crypto.randomUUID();

type ErrorProps = { error: Error | null };

export default function Error({ error }: ErrorProps) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // const [copiedText, copyToClipboard] = useCopyToClipboard();
  // const hasCopiedText = Boolean(copiedText);

  const path = usePathname();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const copyToClipboardOld = () => {
    const currentURL = path;
    const errorMessage = error?.message || "";
    const clipboardText = `[Error Logs]\nLink: ${currentURL}\nError: ${errorMessage}`;

    navigator.clipboard
      .writeText(clipboardText)
      .then(() => {
        setCopyStatus("Details Copied ☑️");
        setTimeout(() => setCopyStatus(null), 3000);
      })
      .catch(() => setCopyStatus("Failed to copy"));
  };

  return (
    <main className="flex h-full flex-col items-center justify-center space-y-4 bg-background px-4 py-24 text-foreground md:px-8 lg:px-20">
      <section className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-md border border-input bg-transparent px-8 py-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <h1 className="text-xl font-heading">🫠 Something went wrong...</h1>
          <Separator className="my-6" />

          {error && (
            <article>
              <label className="mt-3 text-lg">{error.message}</label>
              <Separator className="my-6" />
              <Button
                className="mt-4 flex items-baseline gap-2"
                onClick={copyToClipboardOld}
                // onClick={() => copyToClipboard(randomHash)}
                // disabled={hasCopiedText}
                variant="outline"
                size="default"
              >
                {copyStatus ? copyStatus : "Copy Error"}
                {/* {hasCopiedText ? ClipboardCheck : ClipboardCopy} */}
              </Button>
            </article>
          )}

          {/* {hasCopiedText && (
            <dialog open={hasCopiedText}>
              <h4>
                Copied{" "}
                <span role="img" aria-label="Celebrate Emoji">
                  🎉
                </span>
              </h4>
              <textarea placeholder="Paste your copied text" />
            </dialog>
          )} */}

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "default" }),
              "px-3 mt-6 text-base",
            )}
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
