import { getStudentSessions } from "@/actions/StudentSession";
import { useQuery } from "@tanstack/react-query";
import { ErrorAlert, LoadingAlert } from "../ui/other/CustomAlert";

export default function StudentSessionTable({
  courseName,
}: {
  courseName: string;
}) {
  const {
    data: studentSessions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["studentSessions", courseName],
    queryFn: async () => {
      return await getStudentSessions("courseName");
    },
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {isLoading && <LoadingAlert loadingMessage=" טוען " />}
      {isError && <ErrorAlert errorMessage={error.message} />}
      <h1>
        StudentSessionTable
        {courseName}
      </h1>
    </>
  );
}
