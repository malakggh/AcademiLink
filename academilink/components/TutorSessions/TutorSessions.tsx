"use client";
import { type getAllSessionsForTutorType } from "@/actions/TutorSession";
import TutorSessionCourse from "./TutorSessionCourse";

const TutorSessions = ({
  sessionRequests,
}: {
  sessionRequests: getAllSessionsForTutorType;
}) => {
  return (
    <div className="w-full">
      {sessionRequests.courses.map((course, courseIndex) => (
        <TutorSessionCourse key={courseIndex} course={course} />
      ))}
    </div>
  );
};

export default TutorSessions;
