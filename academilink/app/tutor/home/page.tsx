"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TutorPreferredTeachingMethod from "@/components/TutorPreferredTeachingMethod";
import AvailabilityDaysTeaching from "@/components/AvailabilityDaysTeaching";
import { H3 } from "@/components/ui/Typography";

const TutorPage = () => {
  return (
    <>
      <TutorPreferredTeachingMethod />
      <AvailabilityDaysTeaching />
    </>
  );
};

export default TutorPage;
