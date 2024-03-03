"use client";
import {
  changeTutorTeachingMethod,
  getTutorTeachingMethod,
} from "@/actions/Tutors";
// two main actoions in client side
// 1.to show data using useQuery
// 2.to mutate data using useMutation
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorAlert, LoadingAlert } from "./ui/other/CustomAlert";
import { PreferredTeachingMethods } from "@/lib/enums";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "./ui/other/LoadingSpinner";
import { useState } from "react";

const TutorPreferredTeachingMethod = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["TutorTeachingMethod"],
    queryFn: async () => {
      return await getTutorTeachingMethod();
    },
  });

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const [forceRerender, setForceRerender] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ status }: { status: PreferredTeachingMethods }) => {
      return await changeTutorTeachingMethod(status);
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: data.succes,
      });
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({ queryKey: ["TutorTeachingMethod"] });
      setForceRerender((prev) => {
        return prev + 1;
      });
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const preferredTeachingMethodsArray = Object.values(PreferredTeachingMethods);

  return (
    <div>
      {isLoading && <LoadingAlert loadingMessage=" טוען " />}
      {isError && <ErrorAlert errorMessage={error.message} />}
      {data && (
        <>
          <RadioGroup
            key={forceRerender}
            dir="rtl"
            defaultValue={data.preferredTeachingMethod}
            onValueChange={(newOption: PreferredTeachingMethods) => {
              mutate({ status: newOption });
            }}
            disabled={isPending}
          >
            {preferredTeachingMethodsArray.map((option) => (
              <div className="flex items-center space-x-2" key={option}>
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
                {isPending && <LoadingSpinner />}
              </div>
            ))}
          </RadioGroup>
        </>
      )}
    </div>
  );
};

export default TutorPreferredTeachingMethod;
