"use server";
import { auth } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { error } from "console";

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
      console.log(error.message);
      throw new Error("Tutor not found");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export const changeTutorTeachingMethod = async (
  newStatus: "BOTH" | "ZOOM" | "FRONTAL"
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role !== "TUTOR") {
      throw new Error("You don't have tutor permissions");
    }
    try {
      await prisma.tutor.update({
        data: {
          preferredTeachingMethod: newStatus,
        },
        where: {
          userId: session.user.id,
        },
      });
      return {
        succes: "Teaching method updated successfully",
      };
    } catch (e) {
      throw new Error("Error while updating teaching method");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
