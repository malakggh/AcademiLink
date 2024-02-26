"use server";

import { prisma } from "@/utils/connect";

export const getAllCoursesInSCE = async () => {
  try {
    const allCourses = await prisma.allCoursesInSCE.findMany();
    return allCourses;
  } catch (error) {
    throw new Error("Error while fetching all courses");
  }
};
