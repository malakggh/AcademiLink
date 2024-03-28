import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import SessionStatus from "../StudentSessionRequests/SessionStatus";
import HoursDisplay from "../display/HoursDisplay";
import NameDisplay from "../display/NameDisplay";
import EmailDisplay from "../display/EmailDisplay";
import DateDisplay from "../display/DateDisplay";
import { type getAllSessionsForTutorType } from "@/actions/StudentSession";
import TutorSessionButtons from "./TutorSessionButtons";
export default function TutorSessionCard({
  reqeust,
}: {
  reqeust: getAllSessionsForTutorType["courses"][number]["studentSessionRequests"][number];
}) {
  return (
    <Card
      style={{ width: "300px", direction: "rtl" }}
      className="flex flex-col justify-between px-4"
    >
      <CardHeader>
        <CardTitle className="m-auto">
          {"תאריך בקשה"}
          <DateDisplay date={reqeust.date} />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <HoursDisplay hours={reqeust.hours} />

        <NameDisplay
          name={reqeust.studentSemesterCourse.studentSemester.student.user.name}
        />
        <EmailDisplay
          email={
            reqeust.studentSemesterCourse.studentSemester.student.user.email
          }
        />
        {reqeust.status == "PENDING" && (
          <TutorSessionButtons requestId={reqeust.id} />
        )}
        <div>
          {reqeust.status == "COMPLETED" && reqeust.completionDate && (
            <DateDisplay date={reqeust.completionDate} />
          )}
          {reqeust.status !== "PENDING" && (
            <SessionStatus status={reqeust.status} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
