-- DropForeignKey
ALTER TABLE "TutorCourse" DROP CONSTRAINT "TutorCourse_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCourseRequest" DROP CONSTRAINT "TutorCourseRequest_tutorId_fkey";

-- AddForeignKey
ALTER TABLE "TutorCourse" ADD CONSTRAINT "TutorCourse_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorCourseRequest" ADD CONSTRAINT "TutorCourseRequest_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
