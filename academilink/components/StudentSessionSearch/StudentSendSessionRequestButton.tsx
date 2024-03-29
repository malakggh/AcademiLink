import { sendTutorSessionRequest } from "@/actions/StudentSession";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useState } from "react";
import DialogComponent from "../DialogComponent";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
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
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: async () => {
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
        title: "Error requesting new session",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Course status has been updated successfully",
      });
      router.push("/student/session/requests");
    },
    // todo add onMutate for optimistic updates
    onMutate(variables) {
      return variables;
    },
  });
  return (
    <>
      <DialogComponent
        actionButton={<Button onClick={() => mutate()}>{"שלח בקשה"}</Button>}
        dialogButton={<Button variant="default"> {"שלח בקשה למתגבר"}</Button>}
        title={
          <div className="flex justify-items-stretch text-xl">
            <ExclamationTriangleIcon className="h-6 w-6 ml-4" />
            {"לא ניתן לבטל פעולה זו על ידי סטודנט"}
          </div>
        }
      >
        {
          "יש להגיש בקשות רק לאחר תקשורת ישירה עם המתגבר. עם הגשת בקשתך, מספר השעות שצוין יופחת מחשבונך. שעות אלו יוחזרו אליכם רק אם המתגבר יבטל את הבקשה מכל סיבה שהיא. אחרת, השעות המופחתות יועברו למתגבר."
        }
      </DialogComponent>
    </>
  );
};
