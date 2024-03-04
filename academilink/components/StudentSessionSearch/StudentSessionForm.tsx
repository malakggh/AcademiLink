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
import { useToast } from "@/components/ui/use-toast";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import StudentSessionTable from "./StudentSessionTable";
export default function StudentSessionForm({
  studentCourses,
}: {
  studentCourses: string[];
}) {
  const formSchema = z
    .object({
      courseName: z.string(),
    })
    .refine(
      (data) => {
        return studentCourses.includes(data.courseName);
      },
      {
        message: "הקורס שבחרת אינו קיים במערכת",
        path: ["courseName"],
      }
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
    },
  });

  const selectedCourse = form.watch("courseName");
  // const handleSubmit = async (values: z.infer<typeof formSchema>) => {
  //   console.log(values, selectedCourse);
  //   // render StudentSessionTable
  //   return <StudentSessionTable courseName={values.courseName} />;
  // };

  return (
    <>
      <Form {...form}>
        <form
          className="max-w-md w-full flex flex-col gap-4"
          // onSubmit={form.handleSubmit(handleSubmit)}
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
        </form>
      </Form>
      {selectedCourse && <StudentSessionTable courseName={selectedCourse} />}
    </>
  );
}
