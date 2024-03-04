import { getStudentSessions } from "@/actions/StudentSession";
import { useQuery } from "@tanstack/react-query";

export default function StudentSessionTable({
  courseName,
}: {
  courseName: string;
}) {
  const {
    data: studentSessions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studentSessions", courseName],
    queryFn: async () => {
      return await getStudentSessions(courseName);
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <h1>
        StudentSessionTable
        {courseName}
      </h1>
    </div>
  );
}
