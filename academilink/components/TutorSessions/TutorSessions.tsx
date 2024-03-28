"use client";
import {
  changeSessionStatus,
  type getAllSessionsForTutorType,
} from "@/actions/StudentSession";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ClockIcon,
  CalendarIcon,
  EnvelopeClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TutorSessionDate } from "./TutorSessionDate";
import { useMutation } from "@tanstack/react-query";
import { string } from "zod";
import { StudentSessionRequestStatus } from "@prisma/client";
import { toast } from "../ui/use-toast";
import { useState } from "react";

const TutorSessions = ({
  sessionRequests,
}: {
  sessionRequests: getAllSessionsForTutorType;
}) => {
  const [date, setDate] = useState<Date>();

  console.log(sessionRequests);
  const statusMap = {
    PENDING: (
      <Badge className="text-base" variant="outline">
        {"עדיין לא התקיים"}
      </Badge>
    ),
    COMPLETED: (
      <Badge className="text-base" variant="default">
        {"התגבור התקיים"}
      </Badge>
    ),
    CANCELED: (
      <Badge className="text-base" variant="destructive">
        {"התגבור בוטל"}
      </Badge>
    ),
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      requestId,
      status,
      completionDate,
    }: {
      requestId: string;
      status: "COMPLETED" | "CANCELED";
      completionDate: Date | undefined;
    }) => {
      return await changeSessionStatus(requestId, status, completionDate);
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
  });

  return (
    <div className="w-full">
      {sessionRequests.courses.map((course, courseIndex) => (
        <div key={courseIndex}>
          <div>
            <Badge>{course.courseName}</Badge>
          </div>
          <div>
            <Badge>{course.courseDepartment}</Badge>
          </div>
          <div className="flex flex-wrap justify-start gap-4 pb-4">
            {course.studentSessionRequests.map((reqeust) => (
              <Card
                key={reqeust.id}
                style={{ minWidth: "300px", direction: "rtl" }}
                className="flex flex-col justify-between px-4"
              >
                <CardHeader>
                  <CardTitle className="m-auto">
                    {"תאריך הבקשה: "}
                    {reqeust.date.toDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="flex justify-items-stretch">
                    <ClockIcon className="h-5 w-5 ml-4" />
                    {reqeust.hours}
                    {" שעות "}
                  </div>

                  <div className="flex justify-items-stretch">
                    <PersonIcon className="h-5 w-5 ml-4" />
                    {
                      reqeust.studentSemesterCourse.studentSemester.student.user
                        .name
                    }
                  </div>
                  <div className="flex justify-items-stretch">
                    <EnvelopeClosedIcon className="h-5 w-5 ml-4" />
                    {
                      reqeust.studentSemesterCourse.studentSemester.student.user
                        .email
                    }
                  </div>
                  {reqeust.status == "PENDING" && (
                    <>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          mutate({
                            requestId: reqeust.id,
                            status: "CANCELED",
                            completionDate: undefined,
                          })
                        }
                      >
                        {"ביטול"}
                      </Button>
                      <div>
                        <Button>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button variant="default">{"דווח"}</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="px-8">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  <div className="flex justify-items-stretch text-xl">
                                    {"תדווח על התגבור"}
                                  </div>
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogDescription className="text-xl text-right text-pretty">
                                <div>
                                  {"נא לבחור את התאריך"}
                                  <TutorSessionDate
                                    date={date}
                                    setDate={setDate}
                                  />
                                </div>
                                <div>
                                  <Button
                                    variant="default"
                                    onClick={() =>
                                      mutate({
                                        requestId: reqeust.id,
                                        status: "COMPLETED",
                                        completionDate: date,
                                      })
                                    }
                                  >
                                    <AlertDialogAction>
                                      {"הגיש הדוח"}
                                    </AlertDialogAction>
                                  </Button>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogContent>
                          </AlertDialog>
                        </Button>
                      </div>
                    </>
                  )}
                  <div>{statusMap[reqeust.status]}</div>
                  {reqeust.status == "COMPLETED" && (
                    <div>
                      {"בתאריך: "}
                      {reqeust.completionDate?.toDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TutorSessions;
