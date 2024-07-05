"use server";
import { prisma } from "@/utils/connect";
import { courses } from "@/app/hack/courses";
import { faker } from "@faker-js/faker";
import { getCurrentSesmesterId } from "../util";
import { generateFakeUsers, getRandomCourses, shuffleArray } from "./main";

export const generateFakeUsersAndStudents = async (n: number) => {
  try {
    const newUserIds = await generateFakeUsers(n, false);
    await generateFakeStudents(newUserIds);
  } catch (error: any) {
    throw new Error("error while creating users");
  }
};

export const generateFakeStudents = async (newUserIds: Array<string>) => {
  const distinctDepartments = await prisma.allCoursesInSCE.groupBy({
    by: "courseDepartment",
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: newUserIds,
      },
    },
  });

  const students = () =>
    users.map(async (user) => {
      const { courseDepartment } =
        faker.helpers.arrayElement(distinctDepartments);
      const courses = await getRandomCourses(7, courseDepartment);
      return {
        userId: user.id,
        department: courseDepartment,
        courses: courses,
      };
    });

  const studentData = await Promise.all(students());
  const semesterId = await getCurrentSesmesterId();
  try {
    studentData.forEach(async (student) => {
      await prisma.student.create({
        data: {
          userId: student.userId,
          department: student.department,
          semesters: {
            create: {
              semesterId: semesterId,
              totalHours: 12,
              courses: {
                createMany: {
                  data: student.courses,
                },
              },
            },
          },
        },
      });
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// create fake student session requests
