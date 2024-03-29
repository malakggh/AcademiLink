import { H3 } from "@/components/ui/Typography";
import { months } from "./SelectMonthYear";
import { useQuery } from "@tanstack/react-query";
import { getSessionReportByMonth } from "@/actions/TutorSession";
import { LoadingAlert } from "@/components/ui/other/CustomAlert";
import MonthlyReportTable from "./MonthlyReportTable";
import MonthlyReportSummary from "./MonthlyReportSummary";

export default function MonthlyReport({
  date,
}: {
  date: { month: string; year: string };
}) {
  if (!date.month || !date.year) throw new Error("Date is not set");
  if (isNaN(parseInt(date.month)) || isNaN(parseInt(date.year)))
    throw new Error("Date is not a number");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentSessionRequests", date],
    queryFn: async () => {
      return await getSessionReportByMonth(
        parseInt(date.month),
        parseInt(date.year)
      );
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <H3>
        {"דוח של חודש " +
          months[parseInt(date.month)] +
          "-" +
          date.month +
          " (" +
          date.year +
          ")"}
      </H3>
      {isLoading && <LoadingAlert loadingMessage="טוען דוח חודשי" />}
      {isError && <LoadingAlert loadingMessage={error.message} />}
      {data && <MonthlyReportTable data={data.courses} />}
      {data && <MonthlyReportSummary data={data} />}
    </div>
  );
}
