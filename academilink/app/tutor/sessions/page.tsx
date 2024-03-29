"use client";
import { getAllSessionsForTutor } from "@/actions/TutorSession";
import TutorSessions from "@/components/TutorSessions/TutorSessions";
import { LoadingAlert } from "@/components/ui/other/CustomAlert";
import { useQuery } from "@tanstack/react-query";
const TutorSessionsPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorSessions"],
    queryFn: async () => {
      return await getAllSessionsForTutor();
    },
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {isLoading && <LoadingAlert loadingMessage="טוען נתונים" />}
      {isError && <LoadingAlert loadingMessage={error.message} />}
      {data && <TutorSessions sessionRequests={data} />}
    </>
  );
};

export default TutorSessionsPage;
