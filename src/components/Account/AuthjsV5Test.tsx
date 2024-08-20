"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import SessionData from "~/components/Account/SessionData";
import CustomLink from "~/components/Navigation/CustomLink";

// next-auth v5 | https://github.com/nextauthjs/next-auth/blob/main/apps/examples/nextjs/components/client-example.tsx
const UpdateForm = () => {
  const t = useTranslations("AuthjsV5Test");

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
      <h2 className="text-xl font-bold">{t("updatingTheSession")}</h2>
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
        <Button type="submit">{t("update")}</Button>
      </form>
    </>
  );
};

export default function ClientExample() {
  const t = useTranslations("AuthjsV5Test");

  const { data: session, status } = useSession();
  const [apiResponse] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{t("clientSideRendering")}</h1>
      <p>
        This page fetches session data client side using the{" "}
        <CustomLink href="https://nextjs.authjs.dev/react#usesession">
          <code>{t("usesession")}</code>
        </CustomLink>{" "}
        React Hook.
      </p>
      <p>
        It needs the{" "}
        <CustomLink href="https://react.dev/ref/rsc/use-client">
          <code>{t("useClient")}</code>
        </CustomLink>{" "}
        directive at the top of the file to enable client side rendering, and
        the{" "}
        <CustomLink href="https://nextjs.authjs.dev/react#sessionprovider">
          <code>{t("sessionprovider")}</code>
        </CustomLink>{" "}
        component in{" "}
        <strong>
          <code>{t("clientExamplePageTsx")}</code>
        </strong>{" "}
        to provide the session data.
      </p>
      <div>
        <h2 className="text-xl font-bold">
          {t("thirdPartyBackendIntegration")}
        </h2>
        <p>
          Press the button below to send a request to our{" "}
          <CustomLink href="https://github.com/nextauthjs/authjs-third-party-backend">
            <code>{t("exampleBackend")}</code>
          </CustomLink>
          .
        </p>
        <p>
          Read more{" "}
          <CustomLink href="https://authjs.dev/guides/integrating-third-party-backends">
            <code>{t("here")}</code>
          </CustomLink>
        </p>
        <pre>{apiResponse}</pre>
      </div>
      {status === "loading" ? (
        <div>{t("loading")}</div>
      ) : (
        <SessionData session={session} />
      )}
      <UpdateForm />
    </div>
  );
}
