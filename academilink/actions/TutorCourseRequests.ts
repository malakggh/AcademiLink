"use server";

import { prisma } from "@/utils/connect";

export const requestNewCourse = async (formData: FormData) => {
  console.log("requestNewCourse", formData);
  try {
    const tempUser = await prisma.user.findFirst({ include: { tutor: true } });
    // if (!tempUser) {
    //   throw new Error("User not found");
    // } else {
    //   console.log(tempUser.tutor?.id);
    // }
    // const getCourse = await prisma.allCoursesInSCE.findMany({
    //   where: {
    //     courseDepartment: formData.get("courseDepartment") as string,
    //     courseName: formData.get("courseName") as string,
    //   },
    // });
    // if (getCourse.length === 0) {
    //   throw new Error("Course not found");
    // } else {
    //   console.log(getCourse);
    // }
    await prisma.tutorCourseRequest.create({
      data: {
        courseName: formData.get("courseName") as string,
        courseDepartment: formData.get("courseDepartment") as string,
        tutorId: tempUser?.tutor?.id!,
        courseGrade: 99,
      },
    });
    return { sucess: "Course Sent Successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Error while creating new course");
  }
};
