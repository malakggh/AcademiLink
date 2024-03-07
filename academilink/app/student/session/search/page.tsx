import { getStudentCourses } from "@/actions/Student";
import StudentSessionForm from "@/components/StudentSessionSearch/StudentSessionForm";

const SessionSearch = async () => {
  const { courses, department, totalHours } = await getStudentCourses();
  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <div className="flex flex-col items-center">
        <StudentSessionForm
          studentCourses={courses}
          totalHours={totalHours}
          department={department}
        />
      </div>
    </div>
  );
};

export default SessionSearch;
