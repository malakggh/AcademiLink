"use client";
import {
  generateFakeStudents,
  addAllCourses,
  testx,
  generateFakeTutors,
} from "@/actions/hack";
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
          await testx();
        }}
      >
        test
      </Button>
      <Button
        size="lg"
        onClick={async () => {
          await generateFakeStudents(500);
          alert("Students created successfully");
        }}
      >
        500 Fake Students
      </Button>
      <Button
        size="lg"
        onClick={async () => {
          await generateFakeTutors(500);
          alert("Tutors created successfully");
        }}
      >
        500 Fake Tutor
      </Button>
    </div>
  );
};

export default page;
