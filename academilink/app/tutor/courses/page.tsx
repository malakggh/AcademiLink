import { getAllCoursesInSCE } from "@/actions/Courses";
import FormRequestExample from "@/components/TutorCourseRequest";
import TutorCourses from "@/components/TutorCourses/TutorCourses";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { auth } from "@/utils/auth";

export default async function Courses() {
  const session = await auth();
  if (!session) {
    throw new Error("User not found");
  }
  if (session.user.role !== "TUTOR") {
    throw new Error("You don't have tutor permissions");
  }
  const allCourses = await getAllCoursesInSCE();
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {"הקורסים שלי"}
      </h2>
      <div
        className="
          p-4
          "
      >
        <TutorCourses />
      </div>

      <Collapsible>
        <CollapsibleTrigger>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {"בקשת קורס חדש"}
          </h2>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className="
          flex 
          min-h-screen 
          flex-col 
          justify-between
          p-4
          "
          >
            {allCourses && <FormRequestExample allCourses={allCourses} />}
            {!allCourses && <p>Loading...</p>}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
