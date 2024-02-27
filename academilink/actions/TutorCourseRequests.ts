"use server";

import { prisma } from "@/utils/connect";

import { z } from "zod";
import { getTutorCourseRequestSchema_ } from "@/lib/schema";
import { auth } from "@/utils/auth";

const FormDataSchema = getTutorCourseRequestSchema_();

export const requestNewCourse = async (
  formData: z.infer<typeof FormDataSchema>
) => {
  try {
    const safeData = FormDataSchema.safeParse(formData);
    if (!safeData.success) {
      throw new Error("Invalid form data");
    }

    const session = await auth();
    if (!session) {
      throw new Error("User not found");
    }

    if (session.user.role !== "TUTOR") {
      throw new Error("You don't have tutor permissions");
    }

    const tutor = await prisma.tutor.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        courses: {
          where: {
            courseName: safeData.data.courseName,
            courseDepartment: safeData.data.courseDepartment,
          },
        },
      },
    });

    if (!tutor) {
      throw new Error("You dont don't have a tutor permissions");
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
