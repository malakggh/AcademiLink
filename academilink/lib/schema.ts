import { getAllTutorsCourseRequests } from "@/actions/TutorCourseRequests";
import { AllCoursesInSCE } from "@prisma/client";
import * as z from "zod";

export const getTutorCourseRequestSchema = ({
  allCourses,
}: {
  allCourses: AllCoursesInSCE[];
}) => {
  const allDepartments = Array.from(
    new Set(allCourses.map((course) => course.courseDepartment))
  );

  const formSchema = z
    .object({
      courseDepartment: z.enum(allDepartments as [string, ...string[]]),
      courseName: z.string(),
      courseGrade: z.coerce.number().min(70).max(100),
      message: z.string().optional(),
    })
    .refine(
      (data) => {
        return allCourses.some(
          (course) => course.courseDepartment === data.courseDepartment
        );
      },
      {
        message: "המחלקה שנבחרה לא קיימת",
        path: ["courseDepartment"],
      }
    )
    .refine(
      (data) => {
        return allCourses.some(
          (course) =>
            course.courseDepartment === data.courseDepartment &&
            course.courseName === data.courseName
        );
      },
      {
        message: "הקורס שנבחר לא קיים במחלקה שנבחרה",
        path: ["courseName"],
      }
    );
  return formSchema;
};

export const getTutorCourseRequestSchema_ = () => {
  const formSchema = z.object({
    courseDepartment: z.string(),
    courseName: z.string(),
    courseGrade: z.coerce.number().min(70).max(100),
    message: z.string().optional(),
  });
  return formSchema;
};

export type tutorRequestsArrayNullableType =
  typeof getAllTutorsCourseRequests extends () => Promise<infer T> ? T : never;
export type tutorRequestObjectNotNullableType =
  NonNullable<tutorRequestsArrayNullableType>[number];
