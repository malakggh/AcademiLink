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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {buttons.map((button, index) => (
          <Button
            key={button.stat}
            onClick={() => {
              setSelectedButton(index);
              mutate({ stat: button.stat });
            }}
            className={`px-4 py-2 ${
              selectedButton === index
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground border border-border"
            } hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50`}
            disabled={isPending}
          >
            {button.label}
          </Button>
        ))}
      </div>
      {!isPending && !isError && images.length > 0 && (
        <>
          <div
            onClick={handleImageClick}
            className="cursor-zoom-in relative w-full max-w-3xl h-auto m-auto"
          >
            <Image
              src={images[selectedImageIndex]}
              layout="responsive"
              width={700}
              height={394} // Adjust these values based on your images' aspect ratio
              objectFit="contain"
              alt={"תמונה נבחרת"}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {images.map((img, idx) => (
              <Button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`px-3 py-1 rounded-full ${
                  selectedImageIndex === idx
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted-foreground"
                }`}
              >
                {"תמונה " + (idx + 1)}
              </Button>
            ))}
          </div>
        </>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <Image
              src={images[selectedImageIndex]}
              layout="fill"
              objectFit="contain"
              alt={"תמונה נבחרת"}
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
            >
              {"סגור"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
