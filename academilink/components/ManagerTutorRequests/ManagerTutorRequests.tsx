"use client";

import { getAllTutorsCourseRequests } from "@/actions/TutorCourseRequests";
import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

export default function ManagerTutorRequests() {
  const {
    data: tutorRequests,
    isLoading: tutorRequestsIsLoading,
    isError: tutorRequestsIsError,
  } = useQuery({
    queryKey: ["tutorRequests"],
    queryFn: async () => {
      return await getAllTutorsCourseRequests();
    },
  });
  type tutorRequestsType = NonNullable<typeof tutorRequests>[number];

  const columns: ColumnDef<tutorRequestsType>[] = [
    {
      accessorKey: "tutor.user.name",
      header: "Tutor",
    },
    {
      accessorKey: "courseName",
      header: "Course Name",
    },
    {
      accessorKey: "courseDepartment",
      header: "Department",
    },
    {
      accessorKey: "courseGrade",
      header: "Grade",
    },
    {
      accessorKey: "courseRequestMessage",
      header: "Message",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      {tutorRequests && <DataTable columns={columns} data={tutorRequests} />}
    </div>
  );
}
