import { auth } from "@/utils/auth";
import { prisma } from "@/utils/connect";

export const getStudentCourses = async () => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role === "MANAGER") {
      throw new Error("You don't have student permissions");
    }
    try {
      const student = await prisma.student.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        select: {
          // Include the last semester and get its courses
          semesters: {
            orderBy: {
              startingDate: "desc",
            },
            take: 1,
            select: {
              courses: true,
              totalHours: true,
            },
          },
          department: true,
        },
      });
      return {
        courses: student.semesters[0].courses.map(
          (course) => course.courseName
        ),
        department: student.department,
        totalHours: student.semesters[0].totalHours,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Cant find student courses");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
