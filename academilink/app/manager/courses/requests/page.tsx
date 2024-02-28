import { getAllTutorsCourseRequests } from "@/actions/TutorCourseRequests";
import FormRequestExample from "@/components/TutorCourseRequest";
import TutorCourses from "@/components/TutorCourses/TutorCourses";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { auth } from "@/utils/auth";

export default async function Courses() {
  const session = await auth();
  if (!session) {
    throw new Error("User not found");
  }
  if (session.user.role !== "MANAGER") {
    throw new Error("You don't have manager permissions");
  }
  const allRequests = await getAllTutorsCourseRequests();
  return (
    <div>
      <h2>Tutoring Requests Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Department</th>
            <th>Number of Requests</th>
            <th>Average Grade</th>
          </tr>
        </thead>
        <tbody>
          {allRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.courseName}</td>
              <td>{request.courseDepartment}</td>
              <td>{request._count}</td>
              <td>
                {request._avg.courseGrade &&
                  request._avg.courseGrade.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
