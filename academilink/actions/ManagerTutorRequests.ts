"use server";

import { prisma } from "@/utils/connect";

import { auth } from "@/utils/auth";

export const handleTutorCourseRequest = async ({
  requestId,
  status,
  courseName,
  courseDepartment,
}: {
  requestId: string;
  status: "ACCEPTED" | "REJECTED";
  courseName: string;
  courseDepartment: string;
}) => {
  // make sure the user is a manager
  // make sure the request status is "PENDING"
  // wrap all the request in a try catch block with a descriptive error message
  // there are exactly 1 or 0 pending requests for each tutor with a course name and department
  // on accept or reject, the request status is updated to "ACCEPTED" or "REJECTED"
  // and the tutor's courses are updated accordingly
  // all the requests to the prisma client are done in a single transaction

  try {
    const session = await auth();

    if (!session) {
      throw new Error("You are not authenticated");
    }

    if (session.user.role !== "MANAGER") {
      throw new Error("User is not authorized to handle this request.");
    }

    try {
      return await prisma.$transaction(async (prisma) => {
        let request;
        try {
          request = await prisma.tutorCourseRequest.findUniqueOrThrow({
            where: {
              id: requestId,
              status: "PENDING",
            },
            include: {
              tutor: {
                include: {
                  courses: {
                    where: {
                      courseName: courseName,
                      courseDepartment: courseDepartment,
                    },
                  },
                },
              },
            },
          });
        } catch (error: any) {
          throw new Error("Request not found or already handled");
        }

        if (status === "ACCEPTED")
          if (request.tutor.courses.length > 0)
            throw new Error("Tutor is already tutoring this course");

        // we know that the request is pending and the tutor is not tutoring this course

        try {
          await prisma.tutorCourseRequest.update({
            where: {
              id: requestId,
            },
            data: {
              status,
            },
          });

          if (status === "ACCEPTED") {
            await prisma.tutorCourse.create({
              data: {
                courseName: courseName,
                courseDepartment: courseDepartment,
                tutorId: request.tutorId,
              },
            });
            return { sucess: "Request has been accepted" };
          }

          return { sucess: "Request has been rejected" };
        } catch (error: any) {
          throw new Error("Request status update failed");
        }
      });
    } catch (error: any) {
      throw error;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(`Operation failed: ${error.message}`);
  }
};
