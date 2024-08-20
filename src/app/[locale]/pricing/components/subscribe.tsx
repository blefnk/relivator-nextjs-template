// TODO: This file is not finished yet. It needs to be reviewed and completed.
import type { ReactElement } from "react";

import { Button } from "@/components/ui/button";

type ButtonSetSubscriptionProps = {
  isTemplateFree: boolean | undefined;
  mapPlanId: "enterprise" | "none" | "premium" | "starter";
  userSubscription: "enterprise" | "none" | "premium" | "starter";
};

export default function ButtonSetSubscription({
  isTemplateFree = false,
  mapPlanId,
  userSubscription,
}: ButtonSetSubscriptionProps): ReactElement {
  // eslint-disable-next-line complexity
  function determineButtonText() {
    if (mapPlanId !== userSubscription && mapPlanId !== "starter") {
      return "Subscribe";
    }

    if (mapPlanId === userSubscription && mapPlanId !== "starter") {
      return "Manage";
    }

    if (!isTemplateFree && userSubscription === "starter") {
      return "Manage";
    }

    if (isTemplateFree && userSubscription === "starter") {
      return "Current";
    }

    if (mapPlanId === "starter" && mapPlanId === userSubscription) {
      return "Current";
    }

    if (isTemplateFree && userSubscription === "none") {
      return "Current";
    }

    if (
      isTemplateFree &&
      userSubscription !== "none" &&
      userSubscription !== "starter"
    ) {
      return "Downgrade";
    }

    if (mapPlanId === "starter" && userSubscription === "none") {
      return "Subscribe";
    }

    if (
      !isTemplateFree &&
      userSubscription !== "none" &&
      userSubscription !== "starter"
    ) {
      return "Subscribe";
    }

    return "Current";
  }

  // function onSubmit(e: FormEvent<HTMLFormElement>) {
  // e.preventDefault();
  // startTransition(() => {
  // async function changeSubscription() {
  // try {
  // const session = await updateSubscription({
  // userId,
  // currentSubscription: userSubscription,
  // subscription: mapPlanId,
  // });
  // if (session !== undefined) {
  // toast({
  // description: session.res || "Something went wrong...",
  // title: "User subscription",
  // });
  // }
  // } catch (err) {
  // catchError(err);
  // }
  // }
  // changeSubscription();
  // });
  // } */
  return (
    <form className="w-full">
      {/* <form className="w-full" onSubmit={onSubmit}> */}
      <Button
        className={`
          w-full

          ${
            mapPlanId === userSubscription
              ? "hover:bg-destructive hover:text-destructive-foreground"
              : ""
          }
        `}
        disabled={
          (isTemplateFree && userSubscription === "none") ||
          userSubscription === "starter"
        }
        variant={
          isTemplateFree &&
          userSubscription !== "none" &&
          userSubscription !== "starter"
            ? "destructive"
            : mapPlanId === userSubscription
              ? "outline"
              : isTemplateFree && userSubscription === "none"
                ? "outline"
                : "default"
        }
      >
        {determineButtonText()}
      </Button>
    </form>
  );
}
