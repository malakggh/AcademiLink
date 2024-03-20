import { getAllSessionsForTutor } from "@/actions/StudentSession";
import TutorSessions from "@/components/TutorSessions";
const TutorSessionsPage = async () => {
  const tutorSessionRequests = await getAllSessionsForTutor();
  return (
    <>
      <TutorSessions sessionRequests={tutorSessionRequests} />
    </>
  );
};

export default TutorSessionsPage;
