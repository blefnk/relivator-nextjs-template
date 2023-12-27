"use client";

import { useState } from "react";

export default function WhoAmIButton({
  whoAmIAction,
}: {
  whoAmIAction: () => Promise<string>;
}) {
  const [name, setName] = useState<string>();
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          setName(await whoAmIAction());
        }}
      >
        Who Am I?
      </button>
      {name && <div>You are {name}</div>}
    </div>
  );
}
