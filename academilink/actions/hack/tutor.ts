"use server";
import { prisma } from "@/utils/connect";
import { courses } from "@/app/hack/courses";
import { faker } from "@faker-js/faker";
import { getCurrentSesmesterId, logMessage } from "../util";
import { generateFakeUsers, getRandomCourses } from "./main";

export const generateFakeUsersAndTutors = async (n: number) => {
  try {
    const newUserIds = await generateFakeUsers(n, true);
    await generateFakeTutors(newUserIds);
  } catch (error: any) {
    throw new Error("error while creating users");
  }
};
export const generateFakeTutors = async (newUserIds: Array<string>) => {
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

  const randomCourses = async (courseDepartment: string) => {
    const randomCourses = await getRandomCourses(
      faker.number.int({ min: 3, max: 15 }),
      courseDepartment
    );
    const randomCoursesRequest = randomCourses.filter(
      (_, index) => index % 2 === 0
    );
    const randomCoursesHave = randomCourses.filter(
      (_, index) => index % 2 !== 0
    );

    const coursesRequest = randomCoursesRequest.map((course) => {
      return {
        ...course,
        courseGrade: faker.number.int({ min: 75, max: 100 }),
      };
    });
    return {
      coursesRequest: coursesRequest,
      coursesHave: randomCoursesHave,
    };
  };

  const tutors = () =>
    users.map(async (user) => {
      const { courseDepartment } =
        faker.helpers.arrayElement(distinctDepartments);

      const { coursesHave, coursesRequest } = await randomCourses(
        courseDepartment
      );

      return {
        userId: user.id,
        coursesHave: coursesHave,
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
    throw new Error(error.message);
  }
};

export const processTutorRequestsRandomly = async () => {
  try {
    const semesterId = await getCurrentSesmesterId();
    const semesterEndDate = await prisma.semesterInSCE.findUnique({
      where: { id: semesterId },
      select: { endingDate: true },
    });
    if (!semesterEndDate) {
      throw new Error("Semester not found");
    }
    const tutors = await prisma.tutor.findMany({
      select: {
        id: true,
        courses: {
          select: {
            courseName: true,
            courseDepartment: true,
            studentSessionRequests: {
              where: {
                semesterId: semesterId,
                status: "PENDING",
              },
              select: {
                id: true,
                date: true,
              },
            },
          },
        },
      },
    });

    for (const tutor of tutors) {
      for (const course of tutor.courses) {
        for (const sessionRequest of course.studentSessionRequests) {
          const randomStatus = faker.helpers.arrayElement([
            "COMPLETED",
            "CANCELED",
            "PENDING",
          ]);
          if (randomStatus === "PENDING") {
            continue;
          }
          const requestDate = new Date(sessionRequest.date);
          // complete date is a random date between the request date and the end of the semester
          const completionDate = faker.date.between({
            from: requestDate,
            to: semesterEndDate.endingDate,
          });
          try {
            await prisma.studentSessionRequest.update({
              where: {
                id: sessionRequest.id,
              },
              data: {
                status: randomStatus as "COMPLETED" | "CANCELED",
                completionDate:
                  randomStatus === "COMPLETED" ? completionDate : null,
              },
            });
          } catch (error: any) {
            throw new Error("");
          }
          logMessage(
            "tutorSessionRequest",
            `Tutor ${tutor.id} has updated session request ${sessionRequest.id} to ${randomStatus}\n completion date: ${completionDate}`
          );
        }
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
