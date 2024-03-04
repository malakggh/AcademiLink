import { getStudentCourses } from "@/actions/Student";
import StudentSessionForm from "@/components/StudentSessionSearch/StudentSessionForm";

const SessionSearch = async () => {
  const studentCourses = await getStudentCourses();
  return (
    <div>
      <StudentSessionForm studentCourses={studentCourses} />
    </div>
  );
};

export default SessionSearch;
