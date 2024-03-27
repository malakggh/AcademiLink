"use client";
import { getStudentCourses } from "@/actions/Student";
import StudentSessionForm from "@/components/StudentSessionSearch/StudentSessionForm";
import StudentSessionTable from "@/components/StudentSessionSearch/StudentSessionTable";
import { LoadingAlert } from "@/components/ui/other/CustomAlert";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SessionSearchPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentCourses"],
    queryFn: async () => {
      return await getStudentCourses();
    },
    refetchOnWindowFocus: false,
  });
  const [selectedData, setSelectedData] = useState<
    | {
        courseName: string;
        hours: number;
      }
    | undefined
  >();
  return (
    <>
      {isLoading && <LoadingAlert loadingMessage="טוען נתונים" />}
      {isError && <LoadingAlert loadingMessage={error.message} />}
      {data && (
        <>
          {!selectedData ? (
            <StudentSessionForm
              studentCourses={data.courses}
              totalHours={data.totalHours}
              setSelectedData={setSelectedData}
            />
          ) : (
            <StudentSessionTable
              selectedData={selectedData}
              department={data.department}
            />
          )}
        </>
      )}
    </>
  );
};

export default SessionSearchPage;
