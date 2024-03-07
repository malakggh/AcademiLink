"use client";
import { changeAvabilityFlags, getAvabilityFlags } from "@/actions/Tutors";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorAlert, LoadingAlert } from "./ui/other/CustomAlert";
import { toast } from "./ui/use-toast";
import { LoadingSpinner } from "./ui/other/LoadingSpinner";
import { H3 } from "./ui/Typography";
import { Label } from "./ui/label";

const daysOfWeek = [
  { id: 1, day: "א" },
  { id: 2, day: "ב" },
  { id: 4, day: "ג" },
  { id: 8, day: "ד" },
  { id: 16, day: "ה" },
  { id: 32, day: "ו" },
  { id: 64, day: "שבת" },
] as const;

const AvailabilityDaysTeaching = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["avabilityFlags"],
    queryFn: async () => {
      return await getAvabilityFlags();
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newFlags: number) => {
      console.log(newFlags);
      return await changeAvabilityFlags(newFlags);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["avabilityFlags"] });

      toast({
        title: "Success",
        description: data.succes,
      });
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({ queryKey: ["avabilityFlags"] });

      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <div className="w-full">
      <H3>{"ימי לימודים"}</H3>
      {isLoading && <LoadingAlert loadingMessage="טוען" />}
      {isError && <ErrorAlert errorMessage={error.message} />}
      {data && (
        <div className="flex justify-start gap-4 py-4">
          {daysOfWeek.map(({ id, day }) => (
            <div key={id} className="flex items-center px-2">
              <Checkbox
                id={`day-${day}`}
                checked={id & data.availabilityFlags ? true : false}
                onCheckedChange={(check) => {
                  mutate(
                    data.availabilityFlags + id * (check == true ? 1 : -1)
                  );
                }}
                disabled={isPending}
              />
              <Label
                htmlFor={`day-${id}`}
                className="px-1 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {day}
              </Label>
              {isPending && <LoadingSpinner />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailabilityDaysTeaching;
