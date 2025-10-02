import { Skeleton } from "@/components/ui/skeleton";

export function ListItemSkeleton() {
  return (
    <div className="w-full flex flex-col">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={`skeleton-item-${index}`}
          className="w-full flex flex-row items-center justify-between gap-3 p-2"
        >
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-2 w-[150px]" />
            </div>
          </div>

          <div className="flex flex-col items-start space-y-2">
            <Skeleton className="h-2 w-[200px]" />
            <Skeleton className="h-2 w-[150px]" />
          </div>

          <div className="flex flex-row items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
