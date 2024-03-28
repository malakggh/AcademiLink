import { getAllSessionsForTutor } from "@/actions/StudentSession";
import TutorSessions from "@/components/TutorSessions/TutorSessions";
import { H3 } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
const TutorSessionsPage = async () => {
  const tutorSessionRequests = await getAllSessionsForTutor();
  return (
    <>
      <TutorSessions sessionRequests={tutorSessionRequests} />
    </>
  );
};

export default TutorSessionsPage;
