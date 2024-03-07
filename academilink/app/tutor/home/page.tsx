"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TutorPreferredTeachingMethod from "@/components/TutorPreferredTeachingMethod";
import AvailabilityDaysTeaching from "@/components/AvailabilityDaysTeaching";
import { H3 } from "@/components/ui/Typography";

const TutorPage = () => {
  return (
    <>
      <Button asChild>
        <Link href="/tutor/courses">{"עמוד הקורסים"}</Link>
      </Button>
      <H3>{"שיטת הלימוד"}</H3>
      <div className="p-4">
        <TutorPreferredTeachingMethod />
        <H3>{"ימי לימודים"}</H3>
        <AvailabilityDaysTeaching />
      </div>
    </>
  );
};

export default TutorPage;
