"use client";
import { useState } from "react";
import SelectMonthYear from "./components/SelectMonthYear";
import MonthlyReport from "./components/MonthlyReport";
import { H3 } from "@/components/ui/Typography";

export default function ReportPage() {
  const [date, setDate] = useState({ month: "", year: "" });
  const isEmptyDate = () => {
    return date.month === "" || date.year === "";
  };
  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <H3>{"דוח חודשי"}</H3>
      <SelectMonthYear setDate={setDate} />
      {!isEmptyDate() && <MonthlyReport date={date} />}
    </div>
  );
}
