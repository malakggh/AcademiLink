"use server";
import { auth } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { getTutor } from "./Tutors";
import { ResolvedReturnType, getCurrentSesmesterId } from "./util";

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
    const currentSemesterId = await getCurrentSesmesterId();
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
            where: { semesterId: currentSemesterId },
            select: {
              totalHours: true,
              semesterId: true,
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
        semesterId: studentHours.semesters[0].semesterId,
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
          semesterId: studentInfo.semesterId,
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
    const currentSemesterId = await getCurrentSesmesterId();
    try {
      requests = await prisma.student.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        select: {
          semesters: {
            where: { semesterId: currentSemesterId },
            select: {
              semesterId: true,
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

export type getAllStudentSessionRequestsType = ResolvedReturnType<
  typeof getAllStudentSessionRequests
>;

export const changeSessionStatus = async (
  requestId: string,
  status: "COMPLETED" | "CANCELED",
  completionDate: Date | undefined
) => {
  try {
    if (status === "COMPLETED" && !completionDate) {
      throw new Error("Missing completion date");
    }
    const tutor = await getTutor();
    try {
      await prisma.studentSessionRequest.update({
        where: {
          tutorId: tutor.id,
          id: requestId,
          status: "PENDING",
        },
        data: {
          status: status,
          ...(status === "COMPLETED" && {
            completionDate: completionDate,
          }),
        },
      });
    } catch (e: any) {
      throw new Error("");
    }
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
