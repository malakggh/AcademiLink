"use server";
import { auth } from "@/utils/auth";
import { prisma } from "@/utils/connect";

export const getAllAvailableTutorsForCourse = async (
  courseName: string,
  courseDepartment: string
) => {
  // this function will only show the results of the req
  // it shall not validate that the student is allowed to request a session
  // it won't check if the hours are valid nor if the course exists on the student's courses
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role === "MANAGER") {
      throw new Error("You don't have student permissions");
    }
    if (!courseName || !courseDepartment) {
      throw new Error("Course name or department is missing");
    }
    try {
      return await prisma.tutor.findMany({
        where: {
          courses: {
            some: {
              AND: {
                courseName: courseName,
                courseDepartment: courseDepartment,
                courseActive: true,
              },
            },
          },
        },
        select: {
          preferredTeachingMethod: true,
          availabilityFlags: true,
          user: { select: { name: true, email: true } },
          id: true,
        },
      });
    } catch (error: any) {
      throw new Error("Can't find tutors for the specified course");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export const sendTutorSessionRequest = async (
  tutorId: string,
  courseName: string,
  courseDepartment: string,
  hours: number
) => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role === "MANAGER") {
      throw new Error("You don't have student permissions");
    }
    if (
      !tutorId ||
      !courseName ||
      !courseDepartment ||
      !hours ||
      !Number.isInteger(hours) ||
      hours < 1
    ) {
      throw new Error("Invalid request parameters");
    }
    let studentHoursLeft;
    let studentInfo;
    try {
      // check if the student has enough hours to request a session
      const studentHours = await prisma.student.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          department: true,
          semesters: {
            orderBy: {
              startingDate: "desc",
            },
            take: 1,
            select: {
              totalHours: true,
              startingDate: true,
              courses: {
                select: {
                  sessionRequests: {
                    select: {
                      hours: true,
                    },
                    where: {
                      NOT: {
                        status: "CANCELED",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      let totalUsedHours = 0;
      studentHours.semesters[0].courses.forEach((course) => {
        course.sessionRequests.forEach((request) => {
          totalUsedHours += request.hours;
        });
      });
      studentHoursLeft = studentHours.semesters[0].totalHours - totalUsedHours;
      studentInfo = {
        id: studentHours.id,
        department: studentHours.department,
        semesterStartingDate: studentHours.semesters[0].startingDate,
      };
    } catch (error: any) {
      throw new Error("Can't find student hours");
    }
    if (studentHoursLeft - hours < 0) {
      throw new Error("You don't have enough hours to request this session");
    }
    try {
      await prisma.studentSessionRequest.create({
        data: {
          hours: hours,
          courseName: courseName,
          courseDepartment: courseDepartment,
          studentId: studentInfo.id,
          semesterStartingDate: studentInfo.semesterStartingDate,
          tutorId: tutorId,
        },
      });
      return {
        sucess: "Session request sent successfully",
      };
    } catch (error: any) {
      throw new Error("Can't send session request");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export const getAllStudentSessionRequests = async () => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role === "MANAGER") {
      throw new Error("You don't have student permissions");
    }
    let requests;
    try {
      requests = await prisma.student.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        select: {
          semesters: {
            orderBy: {
              startingDate: "desc",
            },
            take: 1,
            select: {
              startingDate: true,
              totalHours: true,
              courses: {
                select: {
                  courseName: true,
                  sessionRequests: {
                    select: {
                      date: true,
                      hours: true,
                      status: true,
                      tutorCourse: {
                        select: {
                          tutor: {
                            select: {
                              user: {
                                select: {
                                  name: true,
                                  email: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error("Can't find student session requests");
    }
    if (requests.semesters.length === 0) {
      throw new Error("No semester found");
    }
    return requests.semesters[0];
  } catch (error: any) {
    console.log(error.message);
    throw new Error(`Operation failed: ${error.message}`);
  }
};

type ResolvedReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : any;
export type getAllStudentSessionRequestsType = ResolvedReturnType<
  typeof getAllStudentSessionRequests
>;

export type getAllSessionsForTutorType = ResolvedReturnType<
  typeof getAllSessionsForTutor
>;

export const getAllSessionsForTutor = async () => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role !== "TUTOR") {
      throw new Error("You don't have tutor permissions");
    }
    let requests;
    try {
      requests = await prisma.tutor.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        select: {
          courses: {
            select: {
              studentSessionRequests: {
                select: {
                  id: true,
                  hours: true,
                  courseName: true,
                  courseDepartment: true,
                  date: true,
                  completionDate: true,
                  semesterStartingDate: true,
                  status: true,
                  studentSemesterCourse: {
                    select: {
                      studentSemester: {
                        select: {
                          student: {
                            select: {
                              user: {
                                select: {
                                  name: true,
                                  email: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error("Can't find tutor session requests");
    }
    return requests.courses;
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
