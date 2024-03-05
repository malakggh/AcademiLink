"use server";
import { auth } from "@/utils/auth";
import { prisma } from "@/utils/connect";

export const getStudentSessions = async (courseName: string) => {
  // notice that by calling this function you are creating a new request session
  // if it does not exist for this ( course and the chosenTutor is null)
  // because if the chosenTutor is null that means progress is not done yet
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("User not found");
    }
    if (session.user.role === "MANAGER") {
      throw new Error("You don't have student permissions");
    }
    let student;
    try {
      student = await prisma.student.findUniqueOrThrow({
        where: {
          userId: session.user.id,
        },
        include: {
          // Include the last semester and get its courses
          semesters: {
            orderBy: {
              startingDate: "desc",
            },
            take: 1,
            include: {
              courses: {
                where: {
                  courseName: courseName,
                },
              },
              sessionRequests: {
                where: {
                  courseName: courseName,
                  chosenTutor: null,
                },
                include: {
                  progress: true,
                },
              },
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error("Cant find student course");
    }
    if (student.semesters.length === 0) {
      throw new Error("No semesters found");
    }
    if (student.semesters[0].courses.length === 0) {
      throw new Error("Course not found");
    }
    let sessionRequest;
    if (student.semesters[0].sessionRequests.length === 0) {
      // no existing session request
      // create a new session request
      sessionRequest = await prisma.studentSessionRequest.create({
        data: {
          courseName: courseName,
          courseDepartment: student.department,
          studentId: student.id,
          semesterStartingDate: student.semesters[0].startingDate,
          hours: 3,
        },
      });
    } else {
      sessionRequest = student.semesters[0].sessionRequests[0];
    }

    // get all the tutors that are available for the course
    let tutors;
    try {
      tutors = await prisma.tutor.findMany({
        select: {
          preferredTeachingMethod: true,
          availabilityFlags: true,
          user: { select: { name: true } },
          courses: {
            where: {
              courseName: courseName,
              courseDepartment: student.department,
              courseActive: true,
            },
          },
          potentialStudentSessionRequests: {
            where: {
              requestId: sessionRequest.id,
            },
          },
          studentSessionRequests: {
            where: {
              id: sessionRequest.id,
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error("Cant find tutors");
    }
    return { sessionRequest, tutors };
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};
