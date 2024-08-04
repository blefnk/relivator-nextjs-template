"use client";

import { useState } from "react";

import { Button } from "@/browser/reliverse/ui/Button";
import { Input } from "@/browser/reliverse/ui/Input";
import { useSession } from "next-auth/react";

import SessionData from "~/components/Account/SessionData";
import CustomLink from "~/components/Navigation/CustomLink";

// next-auth v5 | https://github.com/nextauthjs/next-auth/blob/main/apps/examples/nextjs/components/client-example.tsx
const UpdateForm = () => {
  const { data: session } = useSession();
  const [name, setName] = useState(`New ${session?.user?.name}` || "");

  if (
    !session && // @ts-expect-error TODO: fix
    session.user
  ) {
    return null;
  }

  return (
    <>
      <h2 className="text-xl font-bold">Updating the session</h2>
      <form
        className="flex w-full max-w-sm items-center space-x-2"
        onSubmit={() => {}}
      >
        <Input
          onChange={(event_) => {
            setName(event_.target.value);
          }}
          placeholder="New name"
          type="text"
          value={name}
        />
        <Button type="submit">Update</Button>
      </form>
    </>
  );
};

export default function ClientExample() {
  const { data: session, status } = useSession();
  const [apiResponse] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Client Side Rendering</h1>
      <p>
        This page fetches session data client side using the{" "}
        <CustomLink href="https://nextjs.authjs.dev/react#usesession">
          <code>useSession</code>
        </CustomLink>{" "}
        React Hook.
      </p>
      <p>
        It needs the{" "}
        <CustomLink href="https://react.dev/ref/rsc/use-client">
          <code>'use client'</code>
        </CustomLink>{" "}
        directive at the top of the file to enable client side rendering, and
        the{" "}
        <CustomLink href="https://nextjs.authjs.dev/react#sessionprovider">
          <code>SessionProvider</code>
        </CustomLink>{" "}
        component in{" "}
        <strong>
          <code>client-example/page.tsx</code>
        </strong>{" "}
        to provide the session data.
      </p>
      <div>
        <h2 className="text-xl font-bold">Third-party backend integration</h2>
        <p>
          Press the button below to send a request to our{" "}
          <CustomLink href="https://github.com/nextauthjs/authjs-third-party-backend">
            <code>example backend</code>
          </CustomLink>
          .
        </p>
        <p>
          Read more{" "}
          <CustomLink href="https://authjs.dev/guides/integrating-third-party-backends">
            <code>here</code>
          </CustomLink>
        </p>
        <pre>{apiResponse}</pre>
      </div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <SessionData session={session} />
      )}
      <UpdateForm />
    </div>
  );
}
