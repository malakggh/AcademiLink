import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { LoadingSpinner } from "./LoadingSpinner";

export const ErrorAlert = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Alert variant="destructive" className="w-full">
      <div style={{ direction: "ltr" }} className="flex">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
      </div>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export const LoadingAlert = ({
  loadingMessage,
}: {
  loadingMessage: string;
}) => {
  return (
    <Alert variant="default" className="w-full">
      <div style={{ direction: "ltr" }} className="flex">
        <LoadingSpinner className="h-4 w-4" />
        <AlertTitle>Loading</AlertTitle>
      </div>
      <AlertDescription>{loadingMessage}</AlertDescription>
    </Alert>
  );
};
