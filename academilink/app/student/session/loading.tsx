import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="max-w-md w-full flex flex-col gap-4 p-4">
      {/* Skeleton for the select dropdown */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Skeleton for the input field */}
      <div>
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Skeleton for the button */}
      <Skeleton className="h-12 w-full rounded-md mt-4" />
    </div>
  );
}
