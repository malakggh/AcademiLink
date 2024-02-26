/*
  Warnings:

  - Added the required column `courseSemester` to the `AllCoursesInSCE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AllCoursesInSCE" ADD COLUMN     "courseSemester" INTEGER NOT NULL;
