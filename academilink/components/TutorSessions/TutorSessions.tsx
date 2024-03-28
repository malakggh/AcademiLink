"use client";
import {
  changeSessionStatus,
  type getAllSessionsForTutorType,
} from "@/actions/StudentSession";
import { Badge } from "../ui/badge";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import TutorSessionCard from "./TutorSessionCard";

const TutorSessions = ({
  sessionRequests,
}: {
  sessionRequests: getAllSessionsForTutorType;
}) => {
  return (
    <div className="w-full">
      {sessionRequests.courses.map((course, courseIndex) => (
        <div key={courseIndex}>
          <div>
            <Badge>{course.courseName}</Badge>
          </div>
          <div>
            <Badge>{course.courseDepartment}</Badge>
          </div>
          <div className="flex flex-wrap justify-start gap-4 pb-4">
            {course.studentSessionRequests.map((reqeust) => (
              <TutorSessionCard key={reqeust.id} reqeust={reqeust} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TutorSessions;
