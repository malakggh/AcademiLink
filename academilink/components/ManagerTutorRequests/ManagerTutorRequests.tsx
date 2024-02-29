"use client";

import { getAllTutorsCourseRequests } from "@/actions/TutorCourseRequests";
import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { TriangleDownIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../ui/table/DataTableColumnHeader";

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
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="תאריך" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return (
          <div className="text-right font-medium">
            {date.toLocaleDateString("he-IL")}
          </div>
        );
      },
    },

    {
      accessorKey: "tutor.user.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="שם מתגבר" />
      ),
    },
    {
      accessorKey: "courseName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="שם הקורס" />
      ),
    },
    {
      accessorKey: "courseDepartment",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="מחלקה" />
      ),
    },
    {
      accessorKey: "courseGrade",
      header: () => <div className="text-right">{"ציון"}</div>,
      cell: ({ row }) => {
        const courseGrade = parseFloat(row.getValue("courseGrade")) / 100;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "percent",
        }).format(courseGrade);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "courseRequestMessage",
      // header: "Message",
      header: () => <div className="text-right">{"הודעה"}</div>,
      cell: ({ row }) => {
        const request = row.original;
        const message = request.courseRequestMessage;
        // handle long text by showing the first 50 char and using dropdown menu to show full text
        return (
          <div className="text-right">
            {message && message.length > 50 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <span>{message.slice(0, 50)}...</span>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">{'"הצג עוד"'}</span>
                      <TriangleDownIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-pretty w-[33%]">
                  <div style={{ direction: "rtl" }}>
                    <DropdownMenuLabel>{"הודעה"}</DropdownMenuLabel>
                    <DropdownMenuItem>{message}</DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              message
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(request.courseName)
                }
              >
                Copy course name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      {tutorRequests && <DataTable columns={columns} data={tutorRequests} />}
    </div>
  );
}
