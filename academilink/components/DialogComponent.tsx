import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
const DialogComponent = ({
  actionButton,
  dialogButton,
  title,
  children,
}: {
  actionButton: React.ReactNode;
  dialogButton: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{dialogButton}</AlertDialogTrigger>
      <AlertDialogContent className="px-8">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-right text-pretty">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between w-full gap-4 flex-row-reverse">
            <AlertDialogCancel>{"בטל"}</AlertDialogCancel>
            <AlertDialogAction asChild>{actionButton}</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogComponent;
