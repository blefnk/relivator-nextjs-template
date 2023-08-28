import { PageHeader } from "~/islands/navigation/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";
import { Skeleton } from "~/islands/primitives/skeleton";
import { Shell } from "~/islands/wrappers/shell";

export default function EmailPreferencesLoading() {
  return (
    <Shell variant="centered">
      <PageHeader title="Email Preferences" className="text-center" />
      <Card>
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex w-full flex-row items-center justify-between space-x-5 rounded-lg border p-4"
              >
                <div className="w-[90%] space-y-1.5">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-5 w-[10%]" />
              </div>
            ))}
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </Shell>
  );
}
