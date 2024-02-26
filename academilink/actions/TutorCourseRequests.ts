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

    const tutor = await prisma.tutor.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!tutor) {
      throw new Error("Tutor not found");
    }

    try {
      await prisma.tutorCourseRequest.create({
        data: {
          courseName: safeData.data.courseName,
          courseDepartment: safeData.data.courseDepartment,
          courseGrade: safeData.data.courseGrade,
          courseRequestMessage: safeData.data.message,
          tutorId: tutor.id,
        },
      });
    } catch (e) {
      throw new Error("Course Request Failed");
    }

    return { sucess: "Course Request Sent Successfully" };
  } catch (error: any) {
    console.log(error);
    throw new Error(`Operation failed: ${error.message}`);
  }
};
