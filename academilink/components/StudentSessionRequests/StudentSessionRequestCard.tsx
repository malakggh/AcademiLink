import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

import { getAllStudentSessionRequestsType } from "@/actions/StudentSession";
import SessionStatus from "./SessionStatus";
import DateDisplay from "@/components/display/DateDisplay";
import EmailDisplay from "../display/EmailDisplay";
import NameDisplay from "../display/NameDisplay";
export default function StudentSessionRequestCard({
  request,
  courseName,
}: {
  request: getAllStudentSessionRequestsType["courses"][number]["sessionRequests"][number];
  courseName: string;
}) {
  return (
    <Card style={{ width: "300px", direction: "rtl" }}>
      <CardHeader>
        <CardTitle className="m-auto">
          <Badge className="text-lg">{courseName}</Badge>
        </CardTitle>
        <CardDescription className="m-auto">
          <Badge variant="secondary">
            {request.hours}
            {" שעות "}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <NameDisplay name={request.tutorCourse.tutor.user.name} />

        <EmailDisplay email={request.tutorCourse.tutor.user.email} />

        <DateDisplay date={request.date} />

        <SessionStatus status={request.status} />
      </CardContent>
    </Card>
  );
}
