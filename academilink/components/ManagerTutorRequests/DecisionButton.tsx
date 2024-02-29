import { tutorRequestObjectNotNullableType } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { handleTutorCourseRequest } from "@/actions/ManagerTutorRequests";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "../ui/other/LoadingSpinner";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const DecisionButton = ({
  request,
  handled,
  onHandled,
}: {
  request: tutorRequestObjectNotNullableType;
  handled: boolean;
  onHandled: (requestId: string) => void;
}) => {
  const { toast } = useToast();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async ({ accept }: { accept: boolean }) => {
      return await handleTutorCourseRequest({
        requestId: request.id,
        status: accept ? "ACCEPTED" : "REJECTED",
        courseName: request.courseName,
        courseDepartment: request.courseDepartment,
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error handling request",
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Request has been handled successfully",
        description: data.sucess,
      });
      onHandled(request.id);
    },
  });
  return (
    <div className="flex space-x-2 justify-end gap-2">
      {isSuccess || handled ? (
        <p className="flex items-center space-x-2 text-sm font-medium">
          {"בקשה טופלה בהצלחה"}
          <CheckCircledIcon className="w-6 h-6 text-green-500" />
        </p>
      ) : (
        <>
          <Button
            variant={"default"}
            onClick={() => {
              mutate({ accept: true });
            }}
            disabled={isPending}
          >
            אשר
          </Button>

          <Button
            variant={"destructive"}
            onClick={() => {
              mutate({ accept: false });
            }}
            disabled={isPending}
          >
            דחה
          </Button>
        </>
      )}

      {isPending && <LoadingSpinner />}
    </div>
  );
};

export default DecisionButton;
