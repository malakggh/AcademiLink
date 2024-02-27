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
import { AllCoursesInSCE } from "@prisma/client";
import { requestNewCourse } from "@/actions/TutorCourseRequests";
import { getTutorCourseRequestSchema } from "@/lib/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
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
      courseSemester: 0,
      courseName: "",
      courseGrade: 0,
      message: "",
    },
  });

  const selectedCourseDepartment = form.watch("courseDepartment");
  const selectedCourseSemester = form.watch("courseSemester");

  function getAllSemesters() {
    const semesters =
      allCourses
        ?.filter(
          (course) => course.courseDepartment === selectedCourseDepartment
        )
        .map((course) => course.courseSemester) || [];
    return Array.from(new Set(semesters));
  }

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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="courseDepartment"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Department</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} key={shouldReset}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course Department" />
                      </SelectTrigger>
                      <SelectContent>
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
              name="courseSemester"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Course Year and Semester</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Year and Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAllSemesters().map((semester) => (
                            <SelectItem key={semester} value={String(semester)}>
                              Year {Math.ceil(semester / 2)}, Semester{" "}
                              {((semester + 1) % 2) + 1 === 1 ? "א" : "ב"}
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
          )}
          {selectedCourseSemester != 0 && (
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          {allCourses
                            .filter(
                              (course) =>
                                course.courseDepartment ===
                                  selectedCourseDepartment &&
                                course.courseSemester == selectedCourseSemester
                            )
                            .map((course) => (
                              <SelectItem
                                key={course.courseName}
                                value={course.courseName}
                              >
                                {course.courseName}
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
          )}

          <FormField
            control={form.control}
            name="courseGrade"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Grade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Course grade"
                      type="number"
                      {...field}
                    />
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="Message" {...field} />
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
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          {errorMessages != "" && (
            <Alert variant="destructive" className="w-full">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessages}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </div>
  );
}
