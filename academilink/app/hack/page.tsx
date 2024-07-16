"use client";
import { addAllCourses, generateFakeUsers } from "@/actions/hack/main";
import {
  generateFakeStudentSessionRequests,
  generateFakeUsersAndStudents,
} from "@/actions/hack/student";
import {
  generateFakeUsersAndTutors,
  processTutorRequestsRandomly,
} from "@/actions/hack/tutor";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <Button
        size="lg"
        onClick={async () => {
          await addAllCourses();
          alert("Courses created successfully");
        }}
      >
        Create Courses
      </Button>
      <Button
        size="lg"
        onClick={async () => {
          await generateFakeUsersAndStudents(500);
          alert("Students created successfully");
        }}
      >
        Create 500 Fake Students
      </Button>
      <Button
        size="lg"
        onClick={async () => {
          await generateFakeUsersAndTutors(500);
          alert("Tutors created successfully");
        }}
      >
        Create 500 Fake Tutor
      </Button>
      <Button
        size="lg"
        onClick={async () => {
          await generateFakeStudentSessionRequests();
          alert("Student Session Requests created successfully");
        }}
      >
        Create Student Session Requests
      </Button>
      <Button
        size="lg"
        onClick={async () => {
          await processTutorRequestsRandomly();
          alert("Tutor Session Requests Status Updated Successfully");
        }}
      >
        Process Tutor Requests Randomly (Update Tutor Session Requests Status)
      </Button>
    </div>
  );
};

export default page;
