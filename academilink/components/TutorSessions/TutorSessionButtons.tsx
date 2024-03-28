import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { TutorSessionDate } from "./TutorSessionDate";
import DialogComponent from "../DialogComponent";
import { LoadingSpinner } from "../ui/other/LoadingSpinner";
import { changeSessionStatus } from "@/actions/StudentSession";

export default function TutorSessionButtons({
  requestId,
}: {
  requestId: string;
}) {
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      status,
      completionDate,
    }: {
      status: "COMPLETED" | "CANCELED";
      completionDate: Date | undefined;
    }) => {
      return await changeSessionStatus(requestId, status, completionDate);
      // // make a simulation of request 2 seconds
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve("success");
      //   }, 5000);
      // });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setCanceledMutate(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorSessions"] });
      toast({
        title: "Session status has been updated successfully",
      });
    },
  });
  const [canceledMutate, setCanceledMutate] = useState(false);
  return (
    <div className="flex justify-between flex-row-reverse">
      <Button
        variant="destructive"
        onClick={() => {
          mutate({
            status: "CANCELED",
            completionDate: undefined,
          });
          setCanceledMutate(true);
        }}
        disabled={isPending}
      >
        {"ביטול"}
        {isPending && canceledMutate && <LoadingSpinner />}
      </Button>
      <DialogComponent
        dialogButton={
          <Button disabled={isPending} variant="default">
            {"דווח"}
            {isPending && !canceledMutate && <LoadingSpinner />}
          </Button>
        }
        title={<div className="text-right">{"דווח על התגבור"}</div>}
        actionButton={
          <Button
            onClick={() =>
              mutate({
                status: "COMPLETED",
                completionDate: date,
              })
            }
            disabled={isPending || !date}
          >
            {"שלח בקשה"}
            {isPending && !canceledMutate && <LoadingSpinner />}
          </Button>
        }
      >
        <div className="grid gap-2">
          {"נא לבחור את התאריך"}
          <TutorSessionDate date={date} setDate={setDate} />
        </div>
      </DialogComponent>
    </div>
  );
}
