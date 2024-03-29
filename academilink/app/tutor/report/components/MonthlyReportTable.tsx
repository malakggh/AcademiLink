import { getSessionReportByMonthType } from "@/actions/TutorSession";
import EmailDisplay from "@/components/display/EmailDisplay";
import { DataTableColumnHeader } from "@/components/ui/table/DataTableColumnHeader";
import { DataTable } from "@/components/ui/table/data-table";
import { ColumnDef } from "@tanstack/react-table";

export default function MonthlyReportTable({
  data,
}: {
  data: getSessionReportByMonthType["courses"];
}) {
  const preprocessData = data
    .map((course) => course.studentSessionRequests)
    .flatMap((x) => x);
  const columns: ColumnDef<(typeof preprocessData)[number]>[] = [
    {
      accessorKey: "completionDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="תאריך סיום" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("completionDate"));
        return (
          <div className="text-right font-medium">
            {date.toLocaleDateString("he-IL")}
          </div>
        );
      },
    },
    {
      accessorKey: "courseName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="קורס" />
      ),
    },
    {
      accessorKey: "courseDepartment",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="מחלקה" />
      ),
    },
    {
      accessorKey: "hours",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="שעות" />
      ),
    },
    {
      accessorKey: "studentSemesterCourse.studentSemester.student.user.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="שם סטודנט" />
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-right">{"מספר תגבור"}</div>,
      cell: ({ row }) => {
        return (
          <div className="w-24">
            <EmailDisplay email={row.getValue("id")} />
          </div>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={preprocessData} />;
}
