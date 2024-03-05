import { useQuery } from "@tanstack/react-query";
import { ErrorAlert, LoadingAlert } from "../ui/other/CustomAlert";
import { getAllAvailableTutorsForCourse } from "@/actions/StudentSession";

export default function StudentSessionTable({
  selectedData: { courseName, hours },
  department,
}: {
  selectedData: { courseName: string; hours: number };
  department: string;
}) {
  const {
    data: tutors,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["TutorsForCourse", courseName, department],
    queryFn: async () => {
      return await getAllAvailableTutorsForCourse(courseName, department);
    },
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {isLoading && <LoadingAlert loadingMessage=" טוען " />}
      {isError && <ErrorAlert errorMessage={error.message} />}
      <h1>
        {courseName}-{hours}-{tutors && JSON.stringify(tutors)}
      </h1>
    </>
  );
}
