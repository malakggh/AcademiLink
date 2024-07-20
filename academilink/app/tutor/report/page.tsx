"use client";
import { useState } from "react";
import SelectMonthYear from "./components/SelectMonthYear";
import MonthlyReport from "./components/MonthlyReport";
import { H3 } from "@/components/ui/Typography";

export default function ReportPage() {
  const today = new Date();
  const [date, setDate] = useState({
    month: (today.getMonth() + 1).toString(),
    year: today.getFullYear().toString(),
  });
  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <H3>{"דוח חודשי"}</H3>
      <SelectMonthYear setDate={setDate} />
      <MonthlyReport date={date} userId={null} />
    </div>
  );
}
