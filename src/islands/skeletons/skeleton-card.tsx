import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/islands/primitives/card-base";
import { Skeleton } from "~/islands/skeletons/skeleton-base";

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="h-10" />
      <CardFooter>
        <Skeleton className="h-8 w-[120px]" />
      </CardFooter>
    </Card>
  );
}
