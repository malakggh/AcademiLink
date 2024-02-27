import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { LightningBoltIcon } from "@radix-ui/react-icons";
const DisplayCourses = ({
  courses,
}: {
  courses:
    | {
        tutorId: string;
        courseName: string;
        courseDepartment: string;
        courseActive: boolean;
      }[]
    | undefined;
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {courses &&
        courses.map((course) => (
          <Card
            key={course.tutorId}
            style={{ width: "300px", direction: "rtl" }}
          >
            <CardHeader>
              <CardTitle>{course.courseName}</CardTitle>
              <CardDescription>
                <Badge variant="outline">{course.courseDepartment}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <LightningBoltIcon />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {"כרגע מלמד"}
                  </p>
                </div>
                <Switch
                  style={{ direction: "ltr" }}
                  checked={course.courseActive}
                  onChange={() => {}}
                />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default DisplayCourses;
