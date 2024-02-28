"use client";

import { getAllTutorsCourseRequests } from "@/actions/TutorCourseRequests";
import { useQuery } from "@tanstack/react-query";

const ManagerTutorRequests = () => {
  const {
    data: tutorRequests,
    isLoading: tutorRequestsIsLoading,
    isError: tutorRequestsIsError,
  } = useQuery({
    queryKey: ["tutorRequests"],
    queryFn: async () => {
      return await getAllTutorsCourseRequests();
    },
  });
  return (
    <div>
      <h2>Tutoring Requests Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Tutor</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Grade</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tutorRequests!.map((request, index) => (
            <tr key={index}>
              <td>{request.tutor.user.name}</td>
              <td>{request.courseName}</td>
              <td>{request.courseDepartment}</td>
              <td>{request.courseGrade}</td>
              <td>{request.courseRequestMessage}</td>
              <td>{request.date.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerTutorRequests;
