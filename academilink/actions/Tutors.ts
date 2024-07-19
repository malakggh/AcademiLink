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

export const getAvabilityFlags = async () => {
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
          availabilityFlags: true,
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

export const changeAvabilityFlags = async (newFlag: number) => {
  try {
    if (!Number.isInteger(newFlag) || newFlag < 0 || newFlag > 128) {
      throw new Error("Invalid flag");
    }
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
          availabilityFlags: newFlag,
        },
        where: {
          userId: session.user.id,
        },
      });
      return {
        succes: "Avaibility day updated successfully",
      };
    } catch (e) {
      throw new Error("Error while updating days");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export const getTutorsWithinDepartment = async (department: string) => {
  try {
    try {
      const tutors = await prisma.user.findMany({
        where: {
          tutor: {
            courses: {
              some: {
                courseDepartment: department,
              },
            },
          },
        },
        select: {
          name: true,
          email: true,
          phoneNumber: true,
          id: true,
        },
      });
      return tutors;
    } catch (error: any) {
      throw new Error("Tutors not found");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
