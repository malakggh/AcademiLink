-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllCoursesInSCE" (
    "courseName" TEXT NOT NULL,
    "courseDepartment" TEXT NOT NULL,

    CONSTRAINT "AllCoursesInSCE_pkey" PRIMARY KEY ("courseName","courseDepartment")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorCourse" (
    "tutorId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseDepartment" TEXT NOT NULL,
    "courseActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TutorCourse_pkey" PRIMARY KEY ("tutorId","courseName","courseDepartment")
);

-- CreateTable
CREATE TABLE "TutorCourseRequest" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseDepartment" TEXT NOT NULL,
    "courseGrade" DOUBLE PRECISION NOT NULL,
    "courseRequestMessage" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorCourseRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_userId_key" ON "Tutor"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorCourse" ADD CONSTRAINT "TutorCourse_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorCourse" ADD CONSTRAINT "TutorCourse_courseName_courseDepartment_fkey" FOREIGN KEY ("courseName", "courseDepartment") REFERENCES "AllCoursesInSCE"("courseName", "courseDepartment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorCourseRequest" ADD CONSTRAINT "TutorCourseRequest_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorCourseRequest" ADD CONSTRAINT "TutorCourseRequest_courseName_courseDepartment_fkey" FOREIGN KEY ("courseName", "courseDepartment") REFERENCES "AllCoursesInSCE"("courseName", "courseDepartment") ON DELETE RESTRICT ON UPDATE CASCADE;
