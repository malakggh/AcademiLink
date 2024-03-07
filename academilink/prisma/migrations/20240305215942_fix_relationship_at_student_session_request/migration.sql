-- DropForeignKey
ALTER TABLE "StudentSessionRequest" DROP CONSTRAINT "StudentSessionRequest_tutorId_fkey";

-- AddForeignKey
ALTER TABLE "StudentSessionRequest" ADD CONSTRAINT "StudentSessionRequest_courseName_courseDepartment_tutorId_fkey" FOREIGN KEY ("courseName", "courseDepartment", "tutorId") REFERENCES "TutorCourse"("courseName", "courseDepartment", "tutorId") ON DELETE RESTRICT ON UPDATE CASCADE;
