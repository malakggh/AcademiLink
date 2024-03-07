import type { getAllStudentSessionRequestsType } from "@/actions/StudentSession";
import { Badge } from "../ui/badge";
import { PersonIcon, CalendarIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { P } from "../ui/Typography";
import Copy from "./Copy";
const Requests = ({
  semester,
}: {
  semester: getAllStudentSessionRequestsType;
}) => {
  const statusMap = {
    PENDING: <Badge variant="outline">{"ממתין לאישור"}</Badge>,
    COMPLETED: <Badge variant="default">{"התגבור התקיים"}</Badge>,
    CANCELED: <Badge variant="destructive">{"התגבור בוטל"}</Badge>,
  };
  return (
    <div className="w-full">
      {semester.courses.map((course) => (
        <div key={course.courseName}>
          {course.sessionRequests.length > 0 && (
            <div className="flex flex-wrap justify-start gap-4 pb-4">
              {course.sessionRequests.map((request) => (
                <Card
                  key={request.date.toString()}
                  style={{ minWidth: "300px", direction: "rtl" }}
                  className="flex flex-col justify-between px-4"
                >
                  <CardHeader>
                    <CardTitle>{"תגבור בקורס "}</CardTitle>
                    <CardDescription className="flex justify-between">
                      <Badge>{course.courseName}</Badge>
                      <Badge variant="secondary">
                        {request.hours}
                        {" שעות "}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex justify-items-stretch">
                      <PersonIcon className="h-5 w-5 ml-4" />
                      <p>{request.tutorCourse.tutor.user.name}</p>
                    </div>
                    <div className="flex justify-items-stretch">
                      <Copy text={request.tutorCourse.tutor.user.email} />
                      <p className="text-wrap">
                        {request.tutorCourse.tutor.user.email}
                      </p>
                    </div>

                    <div className="flex justify-items-stretch">
                      <CalendarIcon className="h-5 w-5 ml-4" />
                      <p>{request.date.toLocaleDateString("he-IL")}</p>
                    </div>

                    <div className="flex justify-between">
                      <p>{"סטטוס"}</p>
                      {statusMap[request.status]}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Requests;
