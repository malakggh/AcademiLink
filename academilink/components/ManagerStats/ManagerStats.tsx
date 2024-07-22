"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import JSZip from "jszip";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { links } from "./StatsLinks";

export default function ManagerStats() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({
      stat,
    }: {
      stat:
        | "session-completion-rates"
        | "tutor-course-distribution"
        | "monthly-session-trends"
        | "tutor-sessions"
        | "student-hours";
    }) => {
      const { data, headers } = await axios({
        url: links[stat],
        method: "get",
        responseType: "blob",
      });
      return { data, headers };
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error handling request",
        description: error.message,
      });
    },
    onSuccess: async ({ data, headers }) => {
      setSelectedImageIndex(0);
      setImages([]);
      if (headers["content-type"] === "image/png") {
        const imageObjectUrl = URL.createObjectURL(data);
        if (!imageObjectUrl) {
          throw new Error("Failed to create object URL");
        }
        setImages([imageObjectUrl]);
      } else if (headers["content-type"] === "application/zip") {
        const zip = await JSZip.loadAsync(data);
        const imageFiles = await Promise.all(
          Object.keys(zip.files)
            .filter((file) => file.endsWith(".png"))
            .map(async (file) => {
              const content = await zip.files[file].async("blob");
              return URL.createObjectURL(content);
            })
        );
        setImages(imageFiles);
      }
      toast({
        title: "Request has been handled successfully",
        description: "Data fetched successfully",
      });
    },
  });
  type StatType =
    | "session-completion-rates"
    | "tutor-course-distribution"
    | "monthly-session-trends"
    | "tutor-sessions"
    | "student-hours";

  const buttons: { stat: StatType; label: string }[] = [
    { stat: "session-completion-rates", label: "התפלגות לקיום התגבורים" },
    { stat: "tutor-course-distribution", label: "התפלגות מתגברים לפי קורסים" },
    { stat: "monthly-session-trends", label: "מגמות מפגשים חודשיים" },
    { stat: "tutor-sessions", label: "מפגשי מתגברים" },
    { stat: "student-hours", label: "שעות סטודנטים" },
  ];
  const [selectedButton, setSelectedButton] = useState(-1);
  return (
    <>
      {buttons.map((button, index) => (
        <Button
          key={button.stat}
          onClick={() => {
            setSelectedButton(index);
            mutate({ stat: button.stat });
          }}
          variant={selectedButton == index ? "default" : "outline"}
          className="ml-auto"
          disabled={isPending}
        >
          {button.label}
        </Button>
      ))}
      {!isPending && !isError && images.length > 0 && (
        <Image
          src={images[selectedImageIndex]}
          width={750}
          height={750}
          alt="Selected Image"
        />
      )}
      {!isPending && !isError && images.length > 0 && (
        <div>
          {images.map((img, idx) => (
            <Button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              variant="outline"
              className="ml-auto"
            >
              {`Image ${idx + 1}`}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
