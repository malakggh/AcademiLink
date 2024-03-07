"use client";
// link to example https://github.com/tomphill/shadcn-form-tut/blob/main/app/page.tsx
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import type { AllCoursesInSCE } from "@prisma/client";
import { requestNewCourse } from "@/actions/TutorCourseRequests";
import { getTutorCourseRequestSchema } from "@/lib/schema";
import {
  CaretSortIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { ErrorAlert } from "@/components/ui/other/CustomAlert";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
export default function FormRequestExample({
  allCourses,
}: {
  allCourses: AllCoursesInSCE[];
}) {
  const { toast } = useToast();
  const allDepartments = Array.from(
    new Set(allCourses.map((course) => course.courseDepartment))
  );

  const formSchema = getTutorCourseRequestSchema({ allCourses });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseDepartment: "",
      courseName: "",
      courseGrade: 0,
      message: "",
    },
  });

  const selectedCourseDepartment = form.watch("courseDepartment");

  const allCoursesInSelectedDepartment = allCourses.filter(
    (course) => course.courseDepartment === selectedCourseDepartment
  );

  const [errorMessages, setErrorMessages] = useState("");
  const [shouldReset, setShouldReset] = useState(0);
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await requestNewCourse(values);
      toast({
        title: "Course Request Sent Successfully",
        description: result.sucess,
      });
      form.reset();
      setShouldReset((prev) => prev + 1); // this is to ensure the select courseDepartment component resets
      setErrorMessages("");
    } catch (error: any) {
      const message: String = error.message;
      console.log(error.message);
      setErrorMessages(
        message.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
      );
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          key={shouldReset}
          control={form.control}
          name="courseDepartment"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{"מחלקת הקורס"}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger style={{ direction: "rtl" }}>
                      <SelectValue placeholder={"בחר מחלקה"} />
                    </SelectTrigger>
                    <SelectContent style={{ direction: "rtl" }}>
                      {allDepartments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
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

        {selectedCourseDepartment && (
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{"שם הקורס"}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? allCoursesInSelectedDepartment.find(
                              (course) => course.courseName === field.value
                            )?.courseName
                          : "בחר קורס"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="חיפוש קורס" className="h-9" />
                      <CommandEmpty>{"קורס לא נמצא"}</CommandEmpty>
                      <CommandGroup>
                        {allCoursesInSelectedDepartment.map((course) => (
                          <CommandItem
                            value={course.courseName}
                            key={course.courseName}
                            onSelect={() => {
                              form.setValue("courseName", course.courseName);
                            }}
                          >
                            {course.courseName}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                course.courseName === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="courseGrade"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{"ציון הקורס"}</FormLabel>
                <FormControl>
                  <Input placeholder="ציון הקורס" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{"הודעה"}</FormLabel>
                <FormControl>
                  <Input placeholder="הודעה" {...field} />
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
          {form.formState.isSubmitting ? "שולח בקשה..." : "שלח בקשה"}
        </Button>
        {errorMessages != "" && <ErrorAlert errorMessage={errorMessages} />}
      </form>
    </Form>
  );
}
