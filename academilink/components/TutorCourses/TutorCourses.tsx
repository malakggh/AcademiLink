"use client";
import { getTutorCourses } from "@/actions/TutorCourses";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DisplayCourses from "./DisplayCourses";
import { useState } from "react";
import { Label } from "../ui/label";
import { ErrorAlert, LoadingAlert } from "@/components/ui/other/CustomAlert";
import { H3 } from "../ui/Typography";

export default function TutorCourses() {
  const {
    data: courses,
    isLoading: coursesIsLoading,
    isError: coursesIsError,
  } = useQuery({
    queryKey: ["tutorCourses"],
    queryFn: async () => {
      return await getTutorCourses();
    },
  });
  function getDepartments() {
    const departments = Array.from(
      new Set(courses?.map((course) => course.courseDepartment))
    );
    return departments.map((department) => ({ department, checked: true }));
  }
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  return (
    <div className="w-full">
      <H3>{"הקורסים שלי"}</H3>
      <div className="pb-4 flex">
        <Label className="text-lg px-2 pt-1">{"בחר מחלקה"}</Label>
        <Select
          value={selectedDepartment}
          onValueChange={(value) => setSelectedDepartment(value)}
        >
          <SelectTrigger className="w-[180px]" style={{ direction: "rtl" }}>
            <SelectValue placeholder="בחר מחלקה" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>{"מחלקות"}</SelectLabel> */}
              <SelectItem value="all" style={{ direction: "rtl" }}>
                {"כל המחלקות"}
              </SelectItem>
              {getDepartments().map((department) => (
                <SelectItem
                  style={{ direction: "rtl" }}
                  key={department.department}
                  value={department.department}
                >
                  {department.department}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {coursesIsLoading && <LoadingAlert loadingMessage="טוען קורסים" />}
      {coursesIsError && <ErrorAlert errorMessage="שגיאה בטעינת הקורסים" />}
      {courses && (
        <DisplayCourses
          courses={
            selectedDepartment === "all"
              ? courses
              : courses?.filter(
                  (course) => course.courseDepartment === selectedDepartment
                )
          }
        />
      )}
    </div>
  );
}
