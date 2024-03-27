"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
export default function StudentSessionForm({
  studentCourses,
  totalHours,
  setSelectedData,
}: {
  studentCourses: string[];
  totalHours: number;
  setSelectedData: Dispatch<
    SetStateAction<
      | {
          courseName: string;
          hours: number;
        }
      | undefined
    >
  >;
}) {
  const formSchema = z
    .object({
      courseName: z.string(),
      hours: z.coerce.number().min(1).max(totalHours),
    })
    .refine(
      (data) => {
        return studentCourses.includes(data.courseName);
      },
      {
        message: "הקורס שבחרת אינו קיים במערכת",
        path: ["courseName"],
      }
    )
    .refine(
      // check if hours is int and not float
      (data) => {
        return Number.isInteger(data.hours);
      },
      {
        message: "שעות חייבות להיות מספר שלם",
        path: ["hours"],
      }
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      hours: 3,
    },
  });
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setSelectedData(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="max-w-md w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name={"courseName"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{"בחר קורס"}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger style={{ direction: "rtl" }}>
                        <SelectValue placeholder="בחר קורס" />
                      </SelectTrigger>
                      <SelectContent style={{ direction: "rtl" }}>
                        {studentCourses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={"hours"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{"שעות"}</FormLabel>
                  <FormControl>
                    <Input placeholder="שעות" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "מחפש..." : "חפש מתגברים"}
          </Button>
        </form>
      </Form>
    </>
  );
}
