import { ClockIcon } from "@radix-ui/react-icons";

export default function HoursDisplay({ hours }: { hours: number }) {
  return (
    <div className="flex justify-items-stretch">
      <ClockIcon className="h-5 w-5 ml-4" />
      {hours}
      {" שעות"}
    </div>
  );
}
