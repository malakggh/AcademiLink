/*
  Warnings:

  - You are about to drop the column `courseSemester` on the `AllCoursesInSCE` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AllCoursesInSCE" DROP COLUMN "courseSemester";

-- CreateTable
CREATE TABLE "SemesterInSCE" (
    "id" TEXT NOT NULL,
    "startingDate" TIMESTAMP(3) NOT NULL,
    "endingDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SemesterInSCE_pkey" PRIMARY KEY ("id")
);
