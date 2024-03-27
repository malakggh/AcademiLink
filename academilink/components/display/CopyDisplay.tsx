"use client";
import { CopyIcon } from "@radix-ui/react-icons";

const CopyDisplay = ({ text }: { text: string }) => {
  return (
    <CopyIcon
      className="h-5 w-5 ml-4 onhover: cursor-pointer"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
      }}
    />
  );
};

export default CopyDisplay;
