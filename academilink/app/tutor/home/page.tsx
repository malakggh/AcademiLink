"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TutorPreferredTeachingMethod from "@/components/TutorPreferredTeachingMethod";
import AvailabilityDaysTeaching from "@/components/AvailabilityDaysTeaching";

const TutorPage = () => {
  return (
    <>
      <Button asChild>
        <Link href="/tutor/courses">{"עמוד הקורסים"}</Link>
      </Button>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {"שיטת הלימוד"}
      </h2>
      <div className="p-4">
        <TutorPreferredTeachingMethod />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {"ימי לימודים"}
        </h2>
        <AvailabilityDaysTeaching />
      </div>
    </>
  );
};

export default TutorPage;
