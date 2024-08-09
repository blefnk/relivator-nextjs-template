import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateNotificationFormSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({
        length: 3,
      }).map((_, index) => (
        <div
          className={`
            flex w-full items-center justify-between space-x-2 rounded-lg border
            p-4
          `}
          key={index}
        >
          <div className="w-full space-y-1.5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
      <Skeleton className="h-8 w-24" />
    </div>
  );
}
