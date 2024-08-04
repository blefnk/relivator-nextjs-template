import Balancer from "react-wrap-balancer";

import { redirect } from "next/navigation";

import { config } from "@reliverse/core";

import { Shell } from "~/components/Wrappers/ShellVariants";
import { env } from "~/env";

// import { PostForm } from "~/forms/post-form";
export default function PlaygroundPage() {
  if (env.NODE_ENV === "production") {
    return redirect("/");
  }

  return (
    <Shell className="px-20">
      <section>
        <h1 className="mb-2 font-bold">
          {config.engine.name} Playground (W.I.P)
        </h1>
        <Balancer>
          This is a special page to try {config.framework.name} Framework
          features, handled by {config.engine.name} Engine.
        </Balancer>
      </section>
      <section>
        <section>
          <h2 className="mb-2 font-semibold">
            [1] React 19: useActionState, useFormStatus, useOptimistic (in
            Client Side)
          </h2>
          Coming soon...
          {/* import { UseActionStateExample } from "~/components/Playground/ReactActionState"; */}
          {/* <UseActionStateExample /> */}
        </section>
        <section>
          <h2 className="mb-2 font-semibold">
            [2] tRPC x React Server Actions
          </h2>
          Coming soon...
          {/* <PostForm /> */}
        </section>
      </section>
    </Shell>
  );
}
