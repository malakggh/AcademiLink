"use client";
import { getTutorTeachingMethod } from "@/actions/Tutors";
// two main actoions in client side
// 1.to show data using useQuery
// 2.to mutate data using useMutation
import { useQuery } from "@tanstack/react-query";

const TutorPreferredTeachingMethod = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["TutorTeachingMethod"],
    queryFn: async () => {
      return await getTutorTeachingMethod();
    },
  });

  return (
    <div>
      {isLoading && <p>loading data from the server</p>}
      {data && data.preferredTeachingMethod}
    </div>
  );
};

export default TutorPreferredTeachingMethod;
