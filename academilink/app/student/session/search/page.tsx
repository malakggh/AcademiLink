import { getStudentCourses } from "@/actions/Student";
import StudentSessionForm from "@/components/StudentSessionSearch/StudentSessionForm";
import { Suspense } from "react";

const SessionSearch = async () => {
  const { courses, department, totalHours } = await getStudentCourses();
  return (
    <>
      <StudentSessionForm
        studentCourses={courses}
        totalHours={totalHours}
        department={department}
      />
    </>
  );
};

export default SessionSearch;
