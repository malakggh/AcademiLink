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

// export const getStudentSessions = async (courseName: string) => {
//   // notice that by calling this function you are creating a new request session
//   // if it does not exist for this ( course and the chosenTutor is null)
//   // because if the chosenTutor is null that means progress is not done yet
//   try {
//     const session = await auth();
//     if (!session || !session.user.id) {
//       throw new Error("User not found");
//     }
//     if (session.user.role === "MANAGER") {
//       throw new Error("You don't have student permissions");
//     }
//     let student;
//     try {
//       student = await prisma.student.findUniqueOrThrow({
//         where: {
//           userId: session.user.id,
//         },
//         include: {
//           // Include the last semester and get its courses
//           semesters: {
//             orderBy: {
//               startingDate: "desc",
//             },
//             take: 1,
//             include: {
//               courses: {
//                 where: {
//                   courseName: courseName,
//                 },
//               },
//               sessionRequests: {
//                 where: {
//                   courseName: courseName,
//                   chosenTutor: null,
//                 },
//                 include: {
//                   progress: true,
//                 },
//               },
//             },
//           },
//         },
//       });
//     } catch (error: any) {
//       throw new Error("Cant find student course");
//     }
//     if (student.semesters.length === 0) {
//       throw new Error("No semesters found");
//     }
//     if (student.semesters[0].courses.length === 0) {
//       throw new Error("Course not found");
//     }
//     let sessionRequest;
//     if (student.semesters[0].sessionRequests.length === 0) {
//       // no existing session request
//       // create a new session request
//       sessionRequest = await prisma.studentSessionRequest.create({
//         data: {
//           courseName: courseName,
//           courseDepartment: student.department,
//           studentId: student.id,
//           semesterStartingDate: student.semesters[0].startingDate,
//           hours: 3,
//         },
//       });
//     } else {
//       sessionRequest = student.semesters[0].sessionRequests[0];
//     }

//     // get all the tutors that are available for the course
//     let tutors;
//     try {
//       tutors = await prisma.tutor.findMany({
//         select: {
//           preferredTeachingMethod: true,
//           availabilityFlags: true,
//           user: { select: { name: true } },
//           courses: {
//             where: {
//               courseName: courseName,
//               courseDepartment: student.department,
//               courseActive: true,
//             },
//           },
//           potentialStudentSessionRequests: {
//             where: {
//               requestId: sessionRequest.id,
//             },
//           },
//           studentSessionRequests: {
//             where: {
//               id: sessionRequest.id,
//             },
//           },
//         },
//       });
//     } catch (error: any) {
//       throw new Error("Cant find tutors");
//     }
//     return { sessionRequest, tutors };
//   } catch (error: any) {
//     throw new Error(`Operation failed: ${error.message}`);
//   }
// };
