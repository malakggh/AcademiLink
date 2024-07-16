"use server";
import { prisma } from "@/utils/connect";
import { fa, faker } from "@faker-js/faker";
import { getCurrentSesmesterId, logMessage } from "../util";
import {
  generateFakeUsers,
  getRandomCourses,
  getRandomTutor,
  shuffleArray,
} from "./main";

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
export const generateFakeStudentSessionRequests = async () => {
  const semesterId = await getCurrentSesmesterId();
  const students = await prisma.student.findMany({
    select: {
      department: true,
      id: true,
      semesters: {
        where: { semesterId: semesterId },
        select: {
          courses: true,
        },
      },
    },
  });

  for (const student of students) {
    const studentCourses = student.semesters[0].courses;
    shuffleArray(studentCourses);
    const randomCourse = studentCourses[0].courseName;
    const tutor = await getRandomTutor(randomCourse, student.department);

    logMessage(
      "studentSessionRequest",
      `student: ${student.id}\ncourse: ${randomCourse}\ntutor: ${tutor.id}\n\n`
    );

    try {
      await prisma.studentSessionRequest.create({
        data: {
          studentId: student.id,
          semesterId: semesterId,
          courseName: randomCourse,
          courseDepartment: student.department,
          tutorId: tutor.id,
          hours: faker.number.int({ min: 1, max: 4 }),
        },
      });
    } catch (error: any) {
      console.log("error", error.message);
    }
  }
};
