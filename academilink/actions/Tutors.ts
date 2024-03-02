"use server";
import { auth } from "@/utils/auth";
import { prisma } from "@/utils/connect";

export const getTutor = async () => {
  const session = await auth();
  if (!session || !session.user.id) {
    throw new Error("User not found");
  }
  if (session.user.role !== "TUTOR") {
    throw new Error("You don't have tutor permissions");
  }
  try {
    const tutor = await prisma.tutor.findUniqueOrThrow({
      where: {
        userId: session.user.id,
      },
    });
    return tutor;
  } catch (error: any) {
    throw new Error("Cant find tutor");
  }
};

export const getTutorWithCourse = async (
  courseName: string,
  courseDepartment: string
) => {
  const session = await auth();
  if (!session || !session.user.id) {
    throw new Error("User not found");
  }
  if (session.user.role !== "TUTOR") {
    throw new Error("You don't have tutor permissions");
  }
  try {
    const tutor = await prisma.tutor.findUniqueOrThrow({
      where: {
        userId: session.user.id,
      },
      include: {
        courses: {
          where: {
            courseName: courseName,
            courseDepartment: courseDepartment,
          },
        },
      },
    });
    return tutor;
  } catch (error: any) {
    throw new Error("Cant find tutor");
  }
};

export const getTutorTeachingMethod = async () => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role !== "TUTOR") {
      throw new Error("You don't have tutor permissions");
    }

    try {
      const result = await prisma.tutor.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        select: {
          preferredTeachingMethod: true,
        },
      });
      return result;
    } catch (error: any) {
      throw new Error("Tutor not found");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
