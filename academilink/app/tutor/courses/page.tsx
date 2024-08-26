import { getAllCoursesInSCE } from "@/actions/Courses";
import FormRequestExample from "@/components/TutorCourseRequest";
import TutorCourses from "@/components/TutorCourses/TutorCourses";
import { H3 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { auth } from "@/utils/auth";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" className="p-7 ml-auto my-7">
            <H3>{"בקשת קורס חדש"}</H3>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="m-auto my-4 border-b-4">
              {"בקשת קורס חדש"}
            </SheetTitle>
          </SheetHeader>
          {allCourses && <FormRequestExample allCourses={allCourses} />}
        </SheetContent>
      </Sheet>

      <TutorCourses />
    </>
  );
}
