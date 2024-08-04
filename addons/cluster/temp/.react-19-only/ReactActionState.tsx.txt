"use client";

import { useActionState, useOptimistic } from "react";

import { redirect } from "next/navigation";

import { Button } from "@/browser/reliverse/ui/Button";
import { RedirectType } from "next/dist/client/components/redirect";

// TODO: This file is currently excluded in Million Lint config
export function UseActionStateExample() {
  return (
    <div className="space-y-6">
      <h2 className="font-bold">Example Coming Soon...</h2>
      <div className="space-y-3">
        <h2 className="font-medium">useActionState</h2>
        <SimpleUseActionState />
      </div>
      <div className="space-y-3">
        <h2 className="font-medium">useActionState: Submit And Redirect</h2>
        <FormTheName />
      </div>
      <div className="space-y-3">
        <h2 className="font-medium">useFormStatus</h2>
        <FormUseFormStatus />
      </div>
      <div className="space-y-3">
        <h2 className="font-medium">useOptimistic</h2>
        <FormUseOptimistic />
      </div>
    </div>
  );
}

// async function increment(previousState: number, formData: FormData) {
function increment(previousState: number) {
  return previousState + 1;
}

function SimpleUseActionState() {
  const [state, formAction] = useActionState(increment, 0);

  return (
    <form>
      {state}
      <Button className="ml-2" formAction={formAction} variant="secondary">
        Increment
      </Button>
    </form>
  );
}

type FormTheNameProps = {
  name: string;
};

type ReturnResponse = {
  message: string;
  ok: boolean;
};

async function updateName(props: FormTheNameProps): Promise<ReturnResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (props.name.length < 3) {
    return {
      message: "Name is too short",
      ok: false,
    };
  }

  return {
    message: "Name updated",
    ok: true,
  };
}

const parseFormData = (formData: FormData) => {
  const name = formData.get("name") as string;

  return {
    name,
  };
};

function FormTheName() {
  const [res, submitAction, isPending] = useActionState<
    null | ReturnResponse,
    FormData
  >(async (_, formData) => {
    const error = await updateName(parseFormData(formData));

    if (!error.ok) {
      return error;
    }

    return redirect("/res", RedirectType.push);
  }, null);

  return (
    <form action={submitAction}>
      <input name="name" type="text" />
      <Button
        className="ml-2"
        disabled={isPending}
        type="submit"
        variant="secondary"
      >
        Update
      </Button>
      {isPending && <p>Submitting...</p>}
      {}
      {res && <p>{res.message}</p>}
    </form>
  );
}

function FormUseFormStatus() {
  // const status = useFormStatus();
  // function Submit() {
  //   return (
  //     <div>
  //       <Button disabled={status.pending} variant="outline">
  //         Submit
  //       </Button>
  //       {status.pending && <p>Submitting...</p>}
  //     </div>
  //   );
  // }
  // const action = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  // };
  return (
    <>
      {/* <form action={action}>
      <Submit />
    </form> */}
      Soon...
    </>
  );
}

const FormUseOptimistic = () => {
  const [name, setName] = useOptimistic("name");
  const [res, submitAction, isPending] = useActionState<
    null | ReturnResponse,
    FormData
  >(
    async (_, formData) => {
      const props = parseFormData(formData);

      setName(props.name);
      const error = await updateName(props);

      if (!error.ok) {
        return error;
      }

      // redirect to /res without 3rd argument
      // redirect("/res", RedirectType.push);
      return null;
    },
    null, // redirect to /res
    "/res",
  );

  return (
    <form action={submitAction}>
      <p className="mb-2">Current Name: {name}</p>
      <label>
        <span className="mr-2">New Name:</span>
        <input name="name" type="text" />
      </label>
      <Button className="ml-2" type="submit" variant="secondary">
        Submit
      </Button>
      {isPending && <p>Submitting...</p>}
      {}
      {res && <p>{res.message}</p>}
    </form>
  );
};
