import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getTutorsWithinDepartment } from "@/actions/Tutors";
import { H2 } from "@/components/ui/Typography";
import NameDisplay from "@/components/display/NameDisplay";
import EmailDisplay from "@/components/display/EmailDisplay";

export default function ShowAllTutors({
  department,
  selectedTutorUserId,
  setSelectedTutorUserId,
}: {
  department: string;
  selectedTutorUserId: string | null;
  setSelectedTutorUserId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const {
    data: tutors,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutors", department],
    queryFn: async () => {
      return await getTutorsWithinDepartment(department);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isLoading && <div>טוען מורים</div>}
      {isError && <div>{error.message}</div>}
      {tutors && (
        <ScrollArea className="mt-5 w-full mx-auto h-screen rounded-md border">
          <div className="p-4">
            <H2 className="mb-4 text-lg font-medium leading-none">
              {"מתגברים במחלקה"}
            </H2>
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                onClick={() => setSelectedTutorUserId(tutor.id)}
                // className={`flex flex-row items-center justify-center py-4 cursor-pointer`}
              >
                <div
                  className={`
                    flex flex-row-reverse items-center justify-between py-4 cursor-pointer
                    ${
                      selectedTutorUserId === tutor.id
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                >
                  {/* <h5 className="text-lg font-bold">{tutor.name}</h5> */}
                  <NameDisplay name={tutor.name} />
                  {/* <p className="text-sm text-gray-500">{tutor.email}</p> */}
                  <EmailDisplay email={tutor.email} />
                </div>
                <Separator className="my-2 w-full" />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
