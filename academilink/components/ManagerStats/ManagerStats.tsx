"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
export default function ManagerStats() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["session-completion-rates"],
    queryFn: async () => {
      const { data } = await axios({
        url: "http://127.0.0.1:8000/api/stats/session-completion-rates",
        method: "get",
        responseType: "blob",
      });
      const imageObjectUrl = URL.createObjectURL(data);
      if (!imageObjectUrl) {
        throw new Error("Failed to create object URL");
      }
      return imageObjectUrl;
    },
  });

  return (
    <>
      {!isLoading && !error && data && (
        <>
          <Image
            src={data}
            width={750}
            height={750}
            alt="Session Completion Rates"
          />
        </>
      )}
    </>
  );
}
