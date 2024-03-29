import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectMonthYear() {
  const months = {
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
  const years = [2023, 2024];
  return (
    <div className="flex gap-2 justify-start">
      <Select>
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
      <Select>
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
