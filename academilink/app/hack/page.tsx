'use client'
import { Button } from "@/components/ui/button";
import { prisma } from "@/utils/connect";

const courses = [
  {
    courseName: "אלגברה לינארית לתוכנה",
    courseDepartment: "הנדסת תוכנה",
    courseSemester: 1,
  },
  {
    courseName: "חדוא 1",
    courseDepartment: "מדעי מחשב",
    courseSemester: 1,
  },
  {
    courseName: "חדוא 1 להנדסת תוכנה",
    courseDepartment: "הנדסת תוכנה",
    courseSemester: 1,
  },
  {
    courseName: "חדוא 2 להנדסת תוכנה",
    courseDepartment: "הנדסת תוכנה",
    courseSemester: 2,
  },
  {
    courseName: "לוגיקה ונושאים דיסקרטיים I ",
    courseDepartment: "הנדסת תוכנה",
    courseSemester: 1,
  },
  {
    courseName: "מבוא למדעי המחשב",
    courseDepartment: "הנדסת תוכנה",
    courseSemester: 1,
  },
  {
    courseName: "מבוא למדעי המחשב",
    courseDepartment: "מדעי מחשב",
    courseSemester: 1,
  },
];

const page = () => {

  return (
    <div>
      <Button size="lg" onClick={
        async () => {
          try {
            await prisma.allCoursesInSCE.createMany({
              data: courses,
            });
          } catch (error: any) {
            throw new Error(`Operation failed: ${error.message}`);
          }
        }
      }>
        Create Courses
      </Button>
      
      
    </div>
  );
};

export default page;
