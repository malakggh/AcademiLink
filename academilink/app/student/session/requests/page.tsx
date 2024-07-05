import { getAllStudentSessionRequests } from "@/actions/StudentSession";
import HoursLeft from "@/components/StudentSessionRequests/HoursLeft";
import Requests from "@/components/StudentSessionRequests/Requests";
import { H3 } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";

const SessionRequests = async () => {
  const semester = await getAllStudentSessionRequests();
  return (
    <>
      <H3>
        {"בקשות שלך לסמסטר הנוכחי"}
        {/* {` - (${semester.startingDate.toLocaleDateString("he-IL")})`} */}
      </H3>
      <Badge>
        <HoursLeft semester={semester} />
      </Badge>
      <Requests semester={semester} />
    </>
  );
};

export default SessionRequests;
