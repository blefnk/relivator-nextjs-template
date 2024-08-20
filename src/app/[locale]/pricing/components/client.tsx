"use client";

import type { ReactElement } from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/reliverse/cn";
import { Settings, Star, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { PricingTableNative } from "~/app/[locale]/pricing/components/upgrade";

// TODO: This file is not finished yet. It needs to be reviewed and completed.
const PricingPageClient = ({
  priceIdEnterprise,
  priceIdPremium,
  userRole,
  userSubscription,
}: {
  priceIdEnterprise: string;
  priceIdPremium: string;
  userRole: "admin" | "user";
  userSubscription: "enterprise" | "none" | "premium" | "starter";
}): ReactElement => {
  const t = useTranslations();

  // const { isLoaded, isSignedIn, session } = useSession();
  // const { userData } = useUserData();
  // const t = useTranslations("logout");
  // const button: ButtonType = {
  //   color: "dangerous",
  //   iconName: "logout",
  //   label: "Logout",
  // };
  // if (!session || !userData) {
  //   redirectToLogin();
  // }
  return (
    <Tabs className="container" defaultValue="plan">
      {/* Tabs title */}
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className="flex" value="settings">
          <span className="mr-2">
            <Settings />
          </span>
          <span>{t("client.settings")}</span>
        </TabsTrigger>
        <TabsTrigger className="flex" value="plan">
          <span className="mr-2">
            <Star />
          </span>
          <span>{t("client.plan")}</span>
        </TabsTrigger>
      </TabsList>
      {/* Settings */}
      <TabsContent value="settings">
        {/* <ClerkProfileSection /> */}
        <Card>
          <CardHeader>
            <CardTitle>{t("client.settings")}</CardTitle>
            <CardDescription>
              Check the profile details or make changes to the account by using
              the button below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
                `
                  whitespace-nowrap px-3

                  hover:text-primary-foreground
                `,
              )}
              href="/user/profile"
            >
              <User
                className={`
                  max-w-5

                  sm:mr-2
                `}
              />
              <span
                className={`
                  hidden

                  sm:block
                `}
              >
                Profile
              </span>
            </Link>
            {/* <div className="space-y-1">
                <Label htmlFor="name">{t("client.name")}</Label>
                <Input id="name" defaultValue="Carl Johnson" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">{t("client.username")}</Label>
                <Input id="username" defaultValue="@CJ" />
              </div> */}
          </CardContent>
          {/* <CardFooter>
              <Button>{t("client.saveChanges")}</Button>
            </CardFooter> */}
        </Card>
        {/* <Card>
            <CardHeader>
              <CardTitle>{t("client.password")}</CardTitle>
              <CardDescription>
                Change the password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">{t("client.currentPassword")}</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">{t("client.newPassword")}</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t("client.savePassword")}</Button>
            </CardFooter>
          </Card> */}
      </TabsContent>
      {/* Plan */}
      <TabsContent value="plan">
        <Card>
          <CardHeader>
            <CardTitle>{t("client.subscriptionPlans")}</CardTitle>
            <CardDescription>
              Manage all the billing things here. Everything in one place.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <PricingTableNative
                priceIdEnterprise={priceIdEnterprise}
                priceIdPremium={priceIdPremium}
                userRole={userRole}
                userSubscription={userSubscription}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PricingPageClient;
