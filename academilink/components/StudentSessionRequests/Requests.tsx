import type { getAllStudentSessionRequestsType } from "@/actions/StudentSession";

import StudentSessionRequestCard from "./StudentSessionRequestCard";
const Requests = ({
  semester,
}: {
  semester: getAllStudentSessionRequestsType;
}) => {
  return (
    <div className="w-full">
      {semester.courses.map((course) => (
        <div key={course.courseName}>
          {course.sessionRequests.length > 0 && (
            <div className="flex flex-wrap justify-start gap-4 pb-4">
              {course.sessionRequests.map((request) => (
                <StudentSessionRequestCard
                  key={request.date.toString()}
                  request={request}
                  courseName={course.courseName}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Requests;
