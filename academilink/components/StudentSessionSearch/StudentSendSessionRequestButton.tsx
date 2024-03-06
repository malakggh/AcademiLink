import { sendTutorSessionRequest } from "@/actions/StudentSession";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useState } from "react";
import StudentSendSessionRequestDialog from "./StudentSendSessionRequestDialog";

export const StudentSendSessionRequestButton = ({
  tutorId,
  courseName,
  courseDepartment,
  hours,
}: {
  tutorId: string;
  courseName: string;
  courseDepartment: string;
  hours: number;
}) => {
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log("senddd");
      return await sendTutorSessionRequest(
        tutorId,
        courseName,
        courseDepartment,
        hours
      );
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error changing course status",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Course status has been updated successfully",
      });
    },
    // todo add onMutate for optimistic updates
    onMutate(variables) {
      return variables;
    },
  });
  return (
    <>
      <StudentSendSessionRequestDialog mutate={mutate} />
      {/* <Button
        onClick={() => {
          mutate();
        }}
      >
        {"שלח בקשה למתרגל"}
      </Button> */}
    </>
  );
};
