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
      const existingPendingRequest = await prisma.tutorCourseRequest.findFirst({
        where: {
          tutorId: tutor.id,
          courseName: safeData.data.courseName,
          courseDepartment: safeData.data.courseDepartment,
          status: "PENDING",
        },
      });
      if (existingPendingRequest) {
        throw new Error("You already have a pending request for this course");
      }
    } catch (error: any) {
      if (
        error.message !== "You already have a pending request for this course"
      ) {
        throw new Error("Operation failed");
      } else {
        throw new Error(error.message);
      }
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
    const groupedRequests = await prisma.tutorCourseRequest.findMany({
      orderBy: {
        date: "desc",
      },
      select: {
        courseName: true,
        courseDepartment: true,
        courseGrade: true,
        courseRequestMessage: true,
        date: true,
        tutor: {
          select: {
            user: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        status: false,
      },
    });
    return groupedRequests;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Operation failed: Can not get requests`);
  }
};
