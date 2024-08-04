"use client";

import type { ReactElement } from "react";

import Link from "next/link";

import { buttonVariants } from "@/browser/reliverse/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/browser/reliverse/ui/CardUI";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/browser/reliverse/ui/Tabs";
import { Settings, Star, User } from "lucide-react";

import { PricingTableNative } from "~/app/[locale]/pricing/components/upgrade";
import { cn } from "~/utils";

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
          <span>Settings</span>
        </TabsTrigger>
        <TabsTrigger className="flex" value="plan">
          <span className="mr-2">
            <Star />
          </span>
          <span>Plan</span>
        </TabsTrigger>
      </TabsList>
      {/* Settings */}
      <TabsContent value="settings">
        {/* <ClerkProfileSection /> */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
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
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Carl Johnson" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@CJ" />
              </div> */}
          </CardContent>
          {/* <CardFooter>
              <Button>Save changes</Button>
            </CardFooter> */}
        </Card>
        {/* <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change the password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card> */}
      </TabsContent>
      {/* Plan */}
      <TabsContent value="plan">
        <Card>
          <CardHeader>
            <CardTitle>Subscription plans</CardTitle>
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
