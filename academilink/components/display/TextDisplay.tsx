import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from "react";

export default function TextDisplay({
  text,
  Icon,
}: {
  text: string;
  Icon: (props: any) => JSX.Element;
}) {
  return (
    <>
      <div className="min-w-0">
        <div className="flex items-center space-x-2">
          <Icon props />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex-1 min-w-0">
                <p className="truncate">{text}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>{text}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
