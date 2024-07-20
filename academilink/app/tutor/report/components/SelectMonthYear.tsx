import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
export const months: { [key: number]: string } = {
  1: "ינואר",
  2: "פברואר",
  3: "מרץ",
  4: "אפריל",
  5: "מאי",
  6: "יוני",
  7: "יולי",
  8: "אוגוסט",
  9: "ספטמבר",
  10: "אוקטובר",
  11: "נובמבר",
  12: "דצמבר",
};
export default function SelectMonthYear({
  setDate,
}: {
  setDate: Dispatch<
    SetStateAction<{
      month: string;
      year: string;
    }>
  >;
}) {
  const today = new Date();
  const years = [2023, 2024];
  return (
    <div className="flex gap-2 justify-start my-4">
      <Select
        defaultValue={(today.getMonth() + 1).toString()}
        onValueChange={(value) =>
          setDate((prev) => ({ ...prev, month: value }))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="בחר חודש" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{"חודשים"}</SelectLabel>
            {Object.entries(months).map(([key, value]) => {
              return (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setDate((prev) => ({ ...prev, year: value }))}
        defaultValue={today.getFullYear().toString()}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="בחר שנה" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{"שנים"}</SelectLabel>
            {years.map((year) => {
              return (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
