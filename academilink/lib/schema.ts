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
      courseSemester: z.coerce.number().min(1).max(8),
      courseName: z.enum(
        allCourses.map((course) => course.courseName) as [string, ...string[]]
      ),
      courseGrade: z.coerce.number().min(70).max(100),
      message: z.string().optional(),
    })
    .refine(
      (data) => {
        // check if the courseSemester is in the selected courseDepartment
        return allCourses.some(
          (course) =>
            course.courseDepartment === data.courseDepartment &&
            course.courseSemester == data.courseSemester
        );
      },
      {
        message: "Course semester is not in the selected department",
        path: ["courseSemester"],
      }
    )
    .refine(
      (data) => {
        // check if the courseName is in the selected courseDepartment and courseSemester
        return allCourses.some(
          (course) =>
            course.courseDepartment === data.courseDepartment &&
            course.courseSemester == data.courseSemester &&
            course.courseName === data.courseName
        );
      },
      {
        message: "Course name is not in the selected department and semester",
        path: ["courseName"],
      }
    );
  return formSchema;
};

export const getTutorCourseRequestSchema_ = () => {
  const formSchema = z.object({
    courseDepartment: z.string(),
    courseSemester: z.coerce.number().min(1).max(8),
    courseName: z.string(),
    courseGrade: z.coerce.number().min(70).max(100),
    message: z.string().optional(),
  });
  return formSchema;
};
