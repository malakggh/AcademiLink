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
    <div style={{ direction: "rtl" }}>
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
      <DisplayCourses
        courses={
          selectedDepartment === "all"
            ? courses
            : courses?.filter(
                (course) => course.courseDepartment === selectedDepartment
              )
        }
      />
    </div>
  );
}
