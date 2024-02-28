-- CreateEnum
CREATE TYPE "CourseRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "TutorCourseRequest" ADD COLUMN     "status" "CourseRequestStatus" NOT NULL DEFAULT 'PENDING';
