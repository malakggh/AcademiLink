import { getAllCoursesInSCE } from "@/actions/Courses";
import FormRequestExample from "@/components/TutorCourseRequest";
import TutorCourses from "@/components/TutorCourses/TutorCourses";
import { auth } from "@/utils/auth";

export default async function Courses() {
  const session = await auth();
  if (!session) {
    throw new Error("User not found");
  }
  if (session.user.role !== "TUTOR") {
    throw new Error("You don't have tutor permissions");
  }
  const allCourses = await getAllCoursesInSCE();
  return (
    <div>
      <TutorCourses />
      {allCourses && <FormRequestExample allCourses={allCourses} />}
      {!allCourses && <p>Loading...</p>}
    </div>
  );
}
