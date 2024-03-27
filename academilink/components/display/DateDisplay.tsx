import { CalendarIcon } from "@radix-ui/react-icons";

export default function DateDisplay({ date }: { date: Date }) {
  return (
    <div className="flex justify-items-stretch">
      <CalendarIcon className="h-5 w-5 ml-4" />
      <p>{date.toLocaleDateString("he-IL")}</p>
    </div>
  );
}
