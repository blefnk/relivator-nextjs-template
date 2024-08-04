"use client";

import { useActionState, useEffect } from "react";

import {
  signInWithCredentials,
  signInWithGithub,
} from "@/server/reliverse/actions/auth";
import consola from "consola";
import { Columns4, Github } from "lucide-react";
import { signIn } from "next-auth/webauthn";
import tryToCatch from "try-to-catch";

import { PasskeySVG } from "~/components/Common/Icons/SVG";
import { SubmitButton } from "~/components/Playground/Boards/SubmitButton";

export function SignInForm(props: {
  githubEnabled: boolean;
}) {
  // @ts-expect-error TODO: Fix ts
  const [error, dispatch] = useActionState(signInWithCredentials);

  useEffect(() => {
    if (error) {
      consola.error(error.error);
    }
  }, [error]);

  // @ts-expect-error TODO: Fix ts
  const [, dispatchPasskey] = useActionState(async () => {
    await tryToCatch(signIn, "passkey");
    consola.error("Failed to sign in with passkey");
  });

  return (
    <div
      className={`
        flex min-h-96 w-full max-w-sm flex-col gap-8 place-self-center
        rounded-2xl bg-slate-900 p-8 shadow-lg
      `}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Columns4 className="size-6 stroke-slate-200" />
        <span className="text-lg font-bold text-slate-200">Sign in</span>
      </div>
      <form
        action={dispatch}
        autoComplete="off"
        className="flex w-full flex-col gap-2"
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-200">Name</span>
          <input
            className={`
              rounded-full border-slate-700 bg-gray-800 px-4 py-2 text-sm
              text-slate-200
            `}
            name="username"
            placeholder="John Doe"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-200">Password</span>
          <input
            className={`
              rounded-full border-slate-700 bg-gray-800 px-4 py-2 text-sm
              text-slate-200
            `}
            minLength={6}
            name="password"
            placeholder="**********"
            required
            type="password"
          />
        </label>
        <SubmitButton>Sign in</SubmitButton>
      </form>
      <div className="relative h-px w-full bg-slate-700">
        <span
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            bg-slate-900 p-2 text-xs text-slate-500
          `}
        >
          or
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <form action={signInWithGithub}>
          <SubmitButton
            disabled={!props.githubEnabled}
            icon={<Github className="size-4" />}
          >
            Sign in with GitHub
          </SubmitButton>
        </form>
        <form action={dispatchPasskey}>
          <SubmitButton>
            <PasskeySVG className="size-4" />
            Sign in with Passkey
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export function AddPassKey() {
  // @ts-expect-error TODO: Fix ts
  const [, dispatch] = useActionState(async () => {
    await tryToCatch(signIn, "passkey", {
      action: "register",
    });
    consola.error("Failed to register passkey");
  });

  return (
    <form action={dispatch}>
      <SubmitButton>
        <PasskeySVG className="size-4" />
        Add Passkey
      </SubmitButton>
    </form>
  );
}
