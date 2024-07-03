/*
  Warnings:

  - The primary key for the `StudentSemester` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `startingDate` on the `StudentSemester` table. All the data in the column will be lost.
  - The primary key for the `StudentSemesterCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `semesterStartingDate` on the `StudentSemesterCourse` table. All the data in the column will be lost.
  - You are about to drop the column `semesterStartingDate` on the `StudentSessionRequest` table. All the data in the column will be lost.
  - Added the required column `semesterId` to the `StudentSemester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `StudentSemesterCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `StudentSessionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentSemesterCourse" DROP CONSTRAINT "StudentSemesterCourse_semesterStartingDate_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSessionRequest" DROP CONSTRAINT "StudentSessionRequest_semesterStartingDate_studentId_cours_fkey";

-- AlterTable
ALTER TABLE "StudentSemester" DROP CONSTRAINT "StudentSemester_pkey",
DROP COLUMN "startingDate",
ADD COLUMN     "semesterId" TEXT NOT NULL,
ADD CONSTRAINT "StudentSemester_pkey" PRIMARY KEY ("semesterId", "studentId");

-- AlterTable
ALTER TABLE "StudentSemesterCourse" DROP CONSTRAINT "StudentSemesterCourse_pkey",
DROP COLUMN "semesterStartingDate",
ADD COLUMN     "semesterId" TEXT NOT NULL,
ADD CONSTRAINT "StudentSemesterCourse_pkey" PRIMARY KEY ("semesterId", "studentId", "courseName", "courseDepartment");

-- AlterTable
ALTER TABLE "StudentSessionRequest" DROP COLUMN "semesterStartingDate",
ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentSemester" ADD CONSTRAINT "StudentSemester_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "SemesterInSCE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesterCourse" ADD CONSTRAINT "StudentSemesterCourse_semesterId_studentId_fkey" FOREIGN KEY ("semesterId", "studentId") REFERENCES "StudentSemester"("semesterId", "studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionRequest" ADD CONSTRAINT "StudentSessionRequest_semesterId_studentId_courseName_cour_fkey" FOREIGN KEY ("semesterId", "studentId", "courseName", "courseDepartment") REFERENCES "StudentSemesterCourse"("semesterId", "studentId", "courseName", "courseDepartment") ON DELETE RESTRICT ON UPDATE CASCADE;
