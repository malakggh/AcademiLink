import { Badge } from "../ui/badge";
import TutorSessionCard from "./TutorSessionCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDownIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { type getAllSessionsForTutorType } from "@/actions/StudentSession";
import { useState } from "react";

export default function TutorSessionCourse({
  course,
}: {
  course: getAllSessionsForTutorType["courses"][number];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div>
        {course.studentSessionRequests.length > 0 && (
          <>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className=" p-2 mb-2">
                {!isOpen ? (
                  <ChevronLeftIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
                <span>{course.courseDepartment}</span>
                <span>-</span>
                <span>{course.courseName}</span>
              </Button>
            </CollapsibleTrigger>
          </>
        )}
        <CollapsibleContent className="space-y-2">
          <div className="flex flex-wrap justify-start gap-4 pb-4">
            {course.studentSessionRequests.map((reqeust) => (
              <TutorSessionCard key={reqeust.id} reqeust={reqeust} />
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
