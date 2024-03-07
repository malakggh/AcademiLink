"use client";

import type { getAllStudentSessionRequestsType } from "@/actions/StudentSession";

const HoursLeft = ({
  semester,
}: {
  semester: getAllStudentSessionRequestsType;
}) => {
  let totalHours = semester.totalHours;
  let usedHours = 0;
  semester.courses.forEach((course) => {
    course.sessionRequests.forEach((request) => {
      if (request.status !== "CANCELED") {
        usedHours += request.hours;
      }
    });
  });
  return <>{`נשארו לך ${totalHours - usedHours} שעות`}</>;
};

export default HoursLeft;
