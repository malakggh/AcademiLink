import { getStudentCourses } from "@/actions/Student";
import StudentSessionForm from "@/components/StudentSessionSearch/StudentSessionForm";

const SessionSearch = async () => {
  const { courses, department, totalHours } = await getStudentCourses();
  return (
    <div>
      <StudentSessionForm
        studentCourses={courses}
        totalHours={totalHours}
        department={department}
      />
    </div>
  );
};

export default SessionSearch;
