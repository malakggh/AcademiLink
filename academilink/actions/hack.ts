"use server";
import { prisma } from "@/utils/connect";
import { courses } from "@/app/hack/courses";
import { faker } from "@faker-js/faker";

export const testx = async () => {
  const distinctDepartments = await prisma.allCoursesInSCE.groupBy({
    by: "courseDepartment",
  });

  console.log(faker.helpers.arrayElement(distinctDepartments));
};

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
    return await prisma.user.createMany({
      data: newUsersWithRole,
      skipDuplicates: true,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const generateFakeStudents = async (n: number) => {
  await generateFakeUsers(n, false);
  const distinctDepartments = await prisma.allCoursesInSCE.groupBy({
    by: "courseDepartment",
  });

  const users = await prisma.user.findMany({
    where: {
      role: "STUDENT",
      student: null,
    },
  });

  const students = () =>
    users.map(async (user) => {
      const { courseDepartment } =
        faker.helpers.arrayElement(distinctDepartments);
      return {
        userId: user.id,
        department: courseDepartment,
        courses: await prisma.allCoursesInSCE.findMany({
          where: {
            courseDepartment: courseDepartment,
            courseSemester: faker.number.int({ min: 1, max: 6 }),
          },
          select: {
            courseName: true,
            courseDepartment: true,
          },
          take: 7,
        }),
      };
    });
  const studentData = await Promise.all(students());
  const todayDate = new Date();
  try {
    studentData.forEach(async (student) => {
      await prisma.student.create({
        data: {
          userId: student.userId,
          department: student.department,
          semesters: {
            create: {
              startingDate: todayDate,
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

export const generateFakeTutors = async (n: number) => {
  try {
    await generateFakeUsers(n, true);
  } catch (error: any) {
    throw new Error("error while creating users");
  }
  const distinctDepartments = await prisma.allCoursesInSCE.groupBy({
    by: "courseDepartment",
  });
  const users = await prisma.user.findMany({
    where: {
      role: "TUTOR",
      tutor: null,
    },
  });

  const tutors = () =>
    users.map(async (user) => {
      const { courseDepartment } =
        faker.helpers.arrayElement(distinctDepartments);
      const coursesThatTutorTeaches = [
        faker.number.int({ min: 1, max: 8 }),
        faker.number.int({ min: 1, max: 8 }),
      ];
      let coursesToRequest;
      while (true) {
        coursesToRequest = faker.number.int({ min: 1, max: 8 });
        if (!coursesThatTutorTeaches.includes(coursesToRequest)) {
          break;
        }
      }
      const temp = await prisma.allCoursesInSCE.findMany({
        select: {
          courseName: true,
          courseDepartment: true,
        },
        where: {
          courseDepartment: courseDepartment,
          courseSemester: coursesToRequest,
        },
        take: 7,
      });
      // add to temp grade a random number between 75 and 100
      const coursesRequest = temp.map((course) => {
        return {
          ...course,
          courseGrade: faker.number.int({ min: 75, max: 100 }),
        };
      });
      return {
        userId: user.id,
        coursesHave: await prisma.allCoursesInSCE.findMany({
          select: {
            courseName: true,
            courseDepartment: true,
          },
          where: {
            courseDepartment: courseDepartment,
            courseSemester: {
              in: coursesThatTutorTeaches,
            },
          },
          take: 7,
        }),
        coursesRequest: coursesRequest,
      };
    });
  const tutorData = await Promise.all(tutors());
  try {
    tutorData.forEach(async (tutor) => {
      await prisma.tutor.create({
        data: {
          userId: tutor.userId,
          preferredTeachingMethod: faker.helpers.arrayElement([
            "ZOOM",
            "FRONTAL",
            "BOTH",
          ]),
          availabilityFlags: faker.number.int({ min: 0, max: 127 }),
          courses: {
            createMany: {
              data: tutor.coursesHave,
            },
          },
          requests: {
            createMany: {
              data: tutor.coursesRequest,
            },
          },
        },
      });
    });
  } catch (error: any) {
    throw new Error("");
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
