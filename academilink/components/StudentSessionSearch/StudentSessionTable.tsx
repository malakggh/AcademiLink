import { useQuery } from "@tanstack/react-query";
import { ErrorAlert, LoadingAlert } from "../ui/other/CustomAlert";
import { getAllAvailableTutorsForCourse } from "@/actions/StudentSession";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "../ui/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/table/data-table";
import type { $Enums } from "@prisma/client";
import { decodeAvailability } from "@/lib/functions";
import { StudentSendSessionRequestButton } from "./StudentSendSessionRequestButton";
import { P } from "../ui/Typography";
import { Badge } from "../ui/badge";
import { PreferredTeachingMethodsReverse } from "@/lib/enums";
export default function StudentSessionTable({
  selectedData: { courseName, hours },
  department,
}: {
  selectedData: { courseName: string; hours: number };
  department: string;
}) {
  const {
    data: tutors,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["TutorsForCourse", courseName, department],
    queryFn: async () => {
      return await getAllAvailableTutorsForCourse(courseName, department);
    },
    refetchOnWindowFocus: false,
  });

  type tableColumnsType = {
    id: string;
    user: {
      name: string;
      email: string;
    };
    preferredTeachingMethod: $Enums.PreferredTeachingMethod;
    availabilityFlags: number;
  };

  const columns: ColumnDef<tableColumnsType>[] = [
    {
      accessorKey: "user.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="שם המתרגל" />
      ),
    },
    {
      accessorKey: "user.email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="אימייל" />
      ),
    },
    {
      accessorKey: "preferredTeachingMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="שיטת הוראה" />
      ),
      cell: ({ row }) => {
        const preferredTeachingMethod = row.original.preferredTeachingMethod;
        return <>{PreferredTeachingMethodsReverse[preferredTeachingMethod]}</>;
      },
    },
    {
      accessorKey: "availabilityFlags",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="זמינות" />
      ),
      cell: ({ row }) => {
        const availabilityFlags = row.original.availabilityFlags;
        const days = decodeAvailability(availabilityFlags);

        return <>{days.length > 0 ? days.join(", ") : "לא עדכן זמינות"}</>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <StudentSendSessionRequestButton
            tutorId={request.id}
            courseName={courseName}
            courseDepartment={department}
            hours={hours}
          />
        );
        // <Button>{"בקש שיעור"}</Button>;
      },
    },
  ];
  return (
    <>
      <div className="flex justify-center gap-4">
        <Badge>
          {"שעות: "}
          {hours}
        </Badge>
        <p>
          {"מתרגלים זמינים לקורס "}
          <Badge>{courseName}</Badge>
        </p>
      </div>
      {isLoading && <LoadingAlert loadingMessage="טוען מתרגלים זמינים" />}
      {isError && <ErrorAlert errorMessage={error.message} />}
      {tutors && <DataTable columns={columns} data={tutors} />}
    </>
  );
}
