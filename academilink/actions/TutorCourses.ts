"use server";

import { prisma } from "@/utils/connect";

import { auth } from "@/utils/auth";
import { getTutor } from "./Tutors";

export const getTutorCourses = async () => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }

    if (session.user.role !== "TUTOR") {
      throw new Error("You don't have tutor permissions");
    }

    let tutor;
    try {
      tutor = await prisma.tutor.findUnique({
        where: {
          userId: session.user.id,
        },
        include: {
          courses: true,
        },
      });
    } catch (e) {
      throw new Error("You dont don't have a tutor permissions");
    }

    if (!tutor) {
      throw new Error("You dont don't have a tutor permissions");
    }

    return tutor.courses;
    // return [
    //   ...tutor.courses,
    //   ...tutor.courses,
    //   ...tutor.courses,
    //   ...tutor.courses,
    //   ...tutor.courses,
    //   ...tutor.courses,
    // ];
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export const changeTutorCourseStatus = async (
  courseName: string,
  courseDepartment: string,
  newStatus: boolean
) => {
  try {
    const tutor = await getTutor();

    try {
      await prisma.tutorCourse.update({
        data: {
          courseActive: newStatus,
        },
        where: {
          tutorId_courseName_courseDepartment: {
            tutorId: tutor.id,
            courseName,
            courseDepartment,
          },
        },
      });
      return {
        success: "Course status has been updated successfully",
      };
    } catch (e) {
      throw new Error("Course status update failed");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
