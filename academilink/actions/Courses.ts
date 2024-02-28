"use server";

import { prisma } from "@/utils/connect";

export const getAllCoursesInSCE = async () => {
  try {
    const allCourses = await prisma.allCoursesInSCE.findMany();
    return allCourses;
  } catch (error: any) {
    console.log("Error while fetching all courses", error.message);
    throw new Error("Error while fetching all courses");
  }
};
