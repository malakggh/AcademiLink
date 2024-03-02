/*
  Warnings:

  - Added the required column `department` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentSessionRequestStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TutorResponse" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "department" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StudentSemester" (
    "startingDate" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "totalHours" INTEGER NOT NULL DEFAULT 12,

    CONSTRAINT "StudentSemester_pkey" PRIMARY KEY ("startingDate","studentId")
);

-- CreateTable
CREATE TABLE "StudentSemesterCourse" (
    "semesterStartingDate" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseDepartment" TEXT NOT NULL,

    CONSTRAINT "StudentSemesterCourse_pkey" PRIMARY KEY ("semesterStartingDate","studentId","courseName","courseDepartment")
);

-- CreateTable
CREATE TABLE "StudentSessionRequest" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "semesterStartingDate" TIMESTAMP(3) NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseDepartment" TEXT NOT NULL,
    "tutorId" TEXT,
    "hours" INTEGER NOT NULL,
    "status" "StudentSessionRequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "StudentSessionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSessionRequestProgress" (
    "requestId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "tutorResponse" "TutorResponse" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "StudentSessionRequestProgress_pkey" PRIMARY KEY ("requestId","tutorId")
);

-- AddForeignKey
ALTER TABLE "StudentSemester" ADD CONSTRAINT "StudentSemester_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesterCourse" ADD CONSTRAINT "StudentSemesterCourse_semesterStartingDate_studentId_fkey" FOREIGN KEY ("semesterStartingDate", "studentId") REFERENCES "StudentSemester"("startingDate", "studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesterCourse" ADD CONSTRAINT "StudentSemesterCourse_courseName_courseDepartment_fkey" FOREIGN KEY ("courseName", "courseDepartment") REFERENCES "AllCoursesInSCE"("courseName", "courseDepartment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionRequest" ADD CONSTRAINT "StudentSessionRequest_semesterStartingDate_studentId_fkey" FOREIGN KEY ("semesterStartingDate", "studentId") REFERENCES "StudentSemester"("startingDate", "studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionRequest" ADD CONSTRAINT "StudentSessionRequest_courseName_courseDepartment_fkey" FOREIGN KEY ("courseName", "courseDepartment") REFERENCES "AllCoursesInSCE"("courseName", "courseDepartment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionRequest" ADD CONSTRAINT "StudentSessionRequest_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionRequestProgress" ADD CONSTRAINT "StudentSessionRequestProgress_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "StudentSessionRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionRequestProgress" ADD CONSTRAINT "StudentSessionRequestProgress_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
