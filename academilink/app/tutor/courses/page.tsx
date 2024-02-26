import { getAllCoursesInSCE } from "@/actions/Courses";
import FormRequestExample from "@/components/TutorCourseRequest";

export default async function Courses() {
  const allCourses = await getAllCoursesInSCE();
  return (
    <div>
      <h1>Courses</h1>
      {/* {allCourses && <TutorCourseRequest allCourses={allCourses} />}
      {!allCourses && <p>Loading...</p>} */}
      {allCourses && <FormRequestExample allCourses={allCourses} />}
      {!allCourses && <p>Loading...</p>}
    </div>
  );
}
