"use client";
import { getAllCoursesInSCE } from "@/actions/Courses";
import { requestNewCourse } from "@/actions/TutorCourseRequests";
import type { AllCoursesInSCE } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import { useSession } from "next-auth/react";

export default function TutorCourseRequest() {
  //   const { data: session, status } = useSession();
  const {
    data: allCourses,
    isLoading: allCoursesLoading,
    isError: allCoursesError,
  } = useQuery({
    queryKey: ["AllCoursesInSCE"],
    queryFn: async () => {
      try {
        const allCourses = await getAllCoursesInSCE();
        return allCourses;
      } catch (error) {
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const [filterConditions, setFilterConditions] = useState({
    courseDepartment: "",
    courseSemester: 0,
  });

  const allDepartments = Array.from(
    new Set(allCourses?.map((course) => course.courseDepartment))
  );

  function getAllSemesters() {
    const semesters =
      allCourses
        ?.filter(
          (course) =>
            course.courseDepartment === filterConditions.courseDepartment
        )
        .map((course) => course.courseSemester) || [];
    return Array.from(new Set(semesters));
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-6xl font-bold">Tutor Course Request</h1>
      </div>
      <form
        className="flex flex-col items-center justify-center w-full h-full"
        action={async (fromData) => {
          await requestNewCourse(fromData);
        }}
      >
        {allCoursesError && <div>Error fetching courses</div>}
        {allCoursesLoading && <div>Loading...</div>}
        {allCourses && (
          <>
            <label htmlFor="courseDepartment">Course Department</label>

            <select
              className="text-red-500"
              name="courseDepartment"
              id="courseDepartment"
              onChange={(e) => {
                setFilterConditions((prev) => ({
                  ...prev,
                  courseDepartment: e.target.value,
                }));
              }}
            >
              {!filterConditions.courseDepartment && ( // Render only if no selection has been made
                <option value="">Select Department</option>
              )}
              {allDepartments.map((department) => (
                <option value={department} key={department}>
                  {department}
                </option>
              ))}
            </select>

            {filterConditions.courseDepartment && (
              <>
                <label htmlFor="courseSemester">Course Year and Semster</label>

                <select
                  className="text-red-500"
                  name="courseSemester"
                  id="courseSemester"
                  onChange={(e) => {
                    try {
                      setFilterConditions((prev) => ({
                        ...prev,
                        courseSemester: parseInt(e.target.value),
                      }));
                    } catch {
                      throw new Error("Invalid Semester");
                    }
                  }}
                >
                  {!filterConditions.courseSemester && ( // Render only if no selection has been made
                    <option value="">Select Year and Semester</option>
                  )}
                  {getAllSemesters().map((semester) => (
                    <option value={semester} key={semester}>
                      Year {Math.ceil(semester / 2)}, Semester{" "}
                      {((semester + 1) % 2) + 1 === 1 ? "א" : "ב"}
                    </option>
                  ))}
                </select>
              </>
            )}

            {filterConditions.courseDepartment &&
              filterConditions.courseSemester && (
                <>
                  <label htmlFor="courseName">Course Name</label>

                  <select
                    className="text-red-500"
                    name="courseName"
                    id="courseName"
                  >
                    {allCourses
                      .filter(
                        (course) =>
                          course.courseDepartment ===
                            filterConditions.courseDepartment &&
                          course.courseSemester ===
                            filterConditions.courseSemester
                      )
                      .map((course) => (
                        <option
                          value={course.courseName}
                          key={course.courseName}
                        >
                          {course.courseName}
                        </option>
                      ))}
                  </select>
                </>
              )}
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
