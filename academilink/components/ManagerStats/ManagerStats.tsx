"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function ManagerStats() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["session-completion-rates"],
    queryFn: async () => {
      const { data } = await axios(
        {
          url: "http://127.0.0.1:8000/api/stats/session-completion-rates",
          method: "get",
        }
        // "http://127.0.0.1:8000/api/stats/session-completion-rates",
        // {
        //   withCredentials: false,
        // },
      );
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Session Completion Rates</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Display the data based on its type
//   const content = data?.imageUrl ? (
//     <img src={data.imageUrl} alt="Session Completion Rates" />
//   ) : (
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   );

//   return (
//     <div>
//       {content}
//     </div>
//   );
