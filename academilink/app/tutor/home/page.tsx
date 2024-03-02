import Link from "next/link";
import { Button } from "@/components/ui/button";
import TutorPreferredTeachingMethod from "@/components/TutorPreferredTeachingMethod";

const TutorPage = () => {
  return (
    <>
      <Button asChild>
        <Link href="/tutor/courses">{"עמוד הקורסים"}</Link>
      </Button>
      <TutorPreferredTeachingMethod />
    </>
  );
};

export default TutorPage;
