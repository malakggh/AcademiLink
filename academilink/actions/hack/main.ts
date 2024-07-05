"use server";
import { prisma } from "@/utils/connect";
import { courses } from "@/app/hack/courses";
import { faker } from "@faker-js/faker";
import { getCurrentSesmesterId } from "./../util";

export const generateFakeUsers = async (n: number, tutor: boolean) => {
  function createNewUsers() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      birthday: faker.date.past(),
    };
  }
  const newUsers = faker.helpers.multiple(createNewUsers, {
    count: n,
  });
  const newUsersWithRole: any = newUsers.map((user) => {
    return {
      ...user,
      role: tutor ? "TUTOR" : "STUDENT",
    };
  });
  try {
    const createdUserIds = [];
    for (const userWithRole of newUsersWithRole) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userWithRole.email },
      });

      if (!existingUser) {
        const createdUser = await prisma.user.create({
          data: userWithRole,
        });
        createdUserIds.push(createdUser.id);
      }
    }
    return createdUserIds;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addAllCourses = async () => {
  try {
    await prisma.allCoursesInSCE.createMany({
      data: courses,
    });
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export const shuffleArray = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getRandomCourses = async (n: number, courseDepartment: string) => {
  const allCourses = await prisma.allCoursesInSCE.findMany({
    where: {
      courseDepartment: courseDepartment,
    },
    select: {
      courseName: true,
      courseDepartment: true,
    },
  });
  shuffleArray(allCourses);
  return allCourses.slice(0, n);
};

/*
DELETE FROM "Tutor"
WHERE "userId" NOT IN (
  'clsyotctv0000x2csxtrmvwfq',
  'clt5ycq5p000282z1v1zymamr',
  'clta4ereb0000los5svtycs70'
);

DELETE FROM "Student"
WHERE "userId" NOT IN (
  'clsyotctv0000x2csxtrmvwfq',
  'clt5ycq5p000282z1v1zymamr',
  'clta4ereb0000los5svtycs70'
);

DELETE FROM "User"
WHERE "id" NOT IN (
  'clsyotctv0000x2csxtrmvwfq',
  'clt5ycq5p000282z1v1zymamr',
  'clta4ereb0000los5svtycs70'
);

*/
