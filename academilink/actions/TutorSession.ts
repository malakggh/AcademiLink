"use server";
import { prisma } from "@/utils/connect";
import { ResolvedReturnType, getSessionCheckRole } from "./util";

export const getSessionReportByMonth = async (
  month: number,
  year: number,
  userId?: string
) => {
  try {
    // if userId is provided, make sure the user is a manager
    // and has permissions to view the report
    let session;
    if (userId) {
      session = await getSessionCheckRole("MANAGER"); // check if the user is a manager else throw an error
    } else {
      session = await getSessionCheckRole("TUTOR");
    }

    let requests;
    try {
      requests = await prisma.tutor.findUniqueOrThrow({
        where: {
          userId: userId || session.user.id,
        },
        select: {
          courses: {
            select: {
              studentSessionRequests: {
                where: {
                  // in prisma get all the sessions completionDate that are in the month and year
                  completionDate: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1),
                  },
                  status: "COMPLETED",
                },
                select: {
                  courseName: true,
                  courseDepartment: true,
                  id: true,
                  hours: true,
                  completionDate: true,
                  semesterId: true,
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
    return requests;
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

export type getSessionReportByMonthType = ResolvedReturnType<
  typeof getSessionReportByMonth
>;

export type getAllSessionsForTutorType = ResolvedReturnType<
  typeof getAllSessionsForTutor
>;

export const getAllSessionsForTutor = async () => {
  try {
    const session = await getSessionCheckRole("TUTOR");
    let requests;
    try {
      requests = await prisma.tutor.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        select: {
          courses: {
            select: {
              courseName: true,
              courseDepartment: true,
              studentSessionRequests: {
                select: {
                  id: true,
                  hours: true,
                  date: true,
                  completionDate: true,
                  semesterId: true,
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
    return requests;
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
