"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useOrganization, useSession, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const TYPES = ["user", "session", "organization"];

export function CodeSwitcher() {
  const [selectedType, setSelectedType] = useState(TYPES[0]);
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  const selectedCode = JSON.stringify(
    {
      organization,
      session,
      user,
      // @ts-expect-error TODO: fix
    }[selectedType],
    null,
    2,
  );

  const typesToShow = organization
    ? TYPES
    : TYPES.filter((type) => type !== "organization");

  return (
    <div className={clsx(organization ? "h-[54.625rem]" : "h-[41.625rem]")}>
      <div className="flex w-full gap-1.5 rounded-md bg-[#F7F7F8] p-[0.1875rem]">
        {typesToShow.map((type) => (
          <button
            className={clsx(
              `
                h-7 flex-1 rounded text-[0.8125rem] font-medium capitalize

                hover:text-black
              `,
              selectedType === type
                ? "bg-white text-black shadow-sm"
                : "text-[#5E5F6E]",
            )}
            key={type}
            onClick={() => {
              setSelectedType(type);
            }}
            type="button"
          >
            {type}
          </button>
        ))}
      </div>
      <div className="relative h-[calc(100%-42px)]">
        <div className="mask h-full">
          <SyntaxHighlighter language="javascript" style={docco}>
            {selectedCode}
          </SyntaxHighlighter>
        </div>
        <div
          className={`
            absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white
            to-transparent
          `}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#EEEEF0]" />
      </div>
    </div>
  );
}
