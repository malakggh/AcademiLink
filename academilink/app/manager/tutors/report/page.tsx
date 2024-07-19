"use client";
import { useState } from "react";
import { H3 } from "@/components/ui/Typography";
import SelectMonthYear from "@/app/tutor/report/components/SelectMonthYear";
import MonthlyReport from "@/app/tutor/report/components/MonthlyReport";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SelectDepartment from "./components/SelectDepartment";
import ShowAllTutors from "./components/ShowAllTutors";
export default function ReportPage() {
  const today = new Date();
  const [date, setDate] = useState({
    month: (today.getMonth() + 1).toString(),
    year: today.getFullYear().toString(),
  });
  const [department, setDepartment] = useState<null | string>(null);
  const [selectedTutorUserId, setSelectedTutorUserId] = useState<string | null>(
    null
  );
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-4/5 mx-auto min-h-screen"
    >
      <ResizablePanel className="px-5">
        <H3>{"בחר מתגבר"}</H3>

        <SelectDepartment setDepartment={setDepartment} />
        {department && (
          <ShowAllTutors
            department={department}
            selectedTutorUserId={selectedTutorUserId}
            setSelectedTutorUserId={setSelectedTutorUserId}
          />
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="px-5">
        <H3>{"דוח חודשי"}</H3>
        <SelectMonthYear setDate={setDate} />
        {selectedTutorUserId && (
          <MonthlyReport date={date} userId={selectedTutorUserId} />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
