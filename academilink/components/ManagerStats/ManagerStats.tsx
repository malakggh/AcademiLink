"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ManagerStats() {
  // http://127.0.0.1:8000/api/stats/session-completion-rates?test=true
  const { data } = useQuery({
    queryKey: ["session-completion-rates"],
    queryFn: async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/stats/session-completion-rates",
        { mode: "no-cors" }
      );
      const data = await response.json();
      console.log(data);
    },
  });
  //   const [data, setData] = useState(null);
  //   useEffect(() => {
  //     fetch("localhost:8000/api/stats/session-completion-rates")
  //       .then((response) => response.json())
  //       .then((data) => setData(data))
  //       .catch((error) => console.error("Error fetching data:", error));
  //   }, []);
  return <></>;
}
