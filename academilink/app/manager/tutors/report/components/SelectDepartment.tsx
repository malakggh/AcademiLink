"use client";

import { getDepartments } from "@/actions/util";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export default function SelectDepartment({
  setDepartment,
}: {
  setDepartment: Dispatch<SetStateAction<null | string>>;
}) {
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      return await getDepartments();
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex gap-2 justify-start my-4">
      {isLoading && <div>טוען מחלקות</div>}
      {isError && <div>{error.message}</div>}
      {departments && (
        <>
          <Select onValueChange={(value) => setDepartment(value)}>
            <SelectTrigger className="w-[180px]" style={{ direction: "rtl" }}>
              <SelectValue placeholder="בחר מחלקה" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {departments.map((department) => {
                  return (
                    <SelectItem
                      key={department}
                      value={department}
                      style={{ direction: "rtl" }}
                    >
                      {department}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
}
