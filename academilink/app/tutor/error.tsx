"use client";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/ui/other/CustomAlert";

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <ErrorAlert errorMessage={error.message} />
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {"נסה שוב"}
      </Button>
    </div>
  );
}
