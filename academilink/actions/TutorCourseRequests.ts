"use server";

import { prisma } from "@/utils/connect";

import { z } from "zod";
import { getTutorCourseRequestSchema_ } from "@/lib/schema";
import { getTutorWithCourse } from "./Tutors";

const FormDataSchema = getTutorCourseRequestSchema_();

export const requestNewCourse = async (
  formData: z.infer<typeof FormDataSchema>
) => {
  try {
    const safeData = FormDataSchema.safeParse(formData);
    if (!safeData.success) {
      throw new Error("Invalid form data");
    }

    const tutor = await getTutorWithCourse(
      safeData.data.courseName,
      safeData.data.courseDepartment
    );
    if (!tutor) {
      throw new Error("You don't have tutor permissions");
    }

    if (tutor.courses.length > 0) {
      throw new Error("You are already tutoring this course");
    }

    try {
      const request = await prisma.tutorCourseRequest.create({
        data: {
          courseName: safeData.data.courseName,
          courseDepartment: safeData.data.courseDepartment,
          courseGrade: safeData.data.courseGrade,
          courseRequestMessage: safeData.data.message,
          tutorId: tutor.id,
        },
      });
      return {
        sucess:
          "Course request for \n" +
          request.courseName +
          " " +
          "\nhas been sent successfully",
      };
    } catch (e) {
      throw new Error("Course request failed");
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export const getAllTutorsCourseRequests = async () => {
  try {
    const groupedRequests = await prisma.tutorCourseRequest.groupBy({
      by: ["courseName", "courseDepartment"],
      _count: true, // Counts the number of requests in each group
      _avg: {
        courseGrade: true, // Averages the courseGrade for requests in each group
      },
      // You can also add _sum, _min, _max, etc., for other aggregations.
    });
    return groupedRequests;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Operation failed: Can not get requests`);
  }
};
