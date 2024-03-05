/*
  Warnings:

  - You are about to drop the `StudentSessionRequestProgress` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `tutorId` on table `StudentSessionRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StudentSessionRequest" DROP CONSTRAINT "StudentSessionRequest_courseName_courseDepartment_fkey";

-- DropForeignKey
ALTER TABLE "StudentSessionRequest" DROP CONSTRAINT "StudentSessionRequest_semesterStartingDate_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSessionRequest" DROP CONSTRAINT "StudentSessionRequest_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSessionRequestProgress" DROP CONSTRAINT "StudentSessionRequestProgress_requestId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSessionRequestProgress" DROP CONSTRAINT "StudentSessionRequestProgress_tutorId_fkey";

-- AlterTable
ALTER TABLE "StudentSessionRequest" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "tutorId" SET NOT NULL;

-- DropTable
DROP TABLE "StudentSessionRequestProgress";

-- DropEnum
DROP TYPE "TutorResponse";

-- AddForeignKey
ALTER TABLE "StudentSessionRequest" ADD CONSTRAINT "StudentSessionRequest_semesterStartingDate_studentId_cours_fkey" FOREIGN KEY ("semesterStartingDate", "studentId", "courseName", "courseDepartment") REFERENCES "StudentSemesterCourse"("semesterStartingDate", "studentId", "courseName", "courseDepartment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionRequest" ADD CONSTRAINT "StudentSessionRequest_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
