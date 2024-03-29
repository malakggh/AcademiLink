import { getSessionReportByMonthType } from "@/actions/TutorSession";
import { H3 } from "@/components/ui/Typography";

export default function MonthlyReportSummary({
  data,
}: {
  data: getSessionReportByMonthType;
}) {
  const totalHours = data.courses.reduce((acc, course) => {
    return (
      acc +
      course.studentSessionRequests.reduce((acc1, session) => {
        return acc1 + session.hours;
      }, 0)
    );
  }, 0);
  const wage = 60;
  return (
    <div className="grid gap-4">
      <H3>{"סיכום חודשי"}</H3>
      <div>{'סה"כ שעות: ' + totalHours}</div>
      <div>{'סה"כ שכר: ' + totalHours * wage + "₪"}</div>
    </div>
  );
}
