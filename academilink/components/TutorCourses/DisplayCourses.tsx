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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeTutorCourseStatus } from "@/actions/TutorCourses";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { LoadingSpinner } from "../ui/other/LoadingSpinner";
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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loadingCourses, setLoadingCourses] = useState<string[]>([]);
  const { mutate } = useMutation({
    mutationFn: async ({
      courseName,
      courseDepartment,
      newStatus,
    }: {
      courseName: string;
      courseDepartment: string;
      newStatus: boolean;
    }) => {
      return await changeTutorCourseStatus(
        courseName,
        courseDepartment,
        newStatus
      );
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error changing course status",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorCourses"] });
      toast({
        title: "Course status has been updated successfully",
      });
    },
    // todo add onMutate for optimistic updates
    onMutate(variables) {
      setLoadingCourses((prev) => [
        ...prev,
        `${variables.courseName}${variables.courseDepartment}`,
      ]);
      return variables;
    },
    onSettled(variables, error, data) {
      setLoadingCourses((prev) =>
        prev.filter(
          (course) => course !== `${data.courseName}${data.courseDepartment}`
        )
      );
    },
  });
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {courses &&
        courses.map((course) => (
          <Card
            key={course.tutorId}
            style={{ width: "300px", direction: "rtl" }}
            className="flex flex-col justify-between"
          >
            <CardHeader>
              <CardDescription>
                <Badge variant="secondary">{course.courseDepartment}</Badge>
              </CardDescription>
              <CardTitle>{course.courseName}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <LightningBoltIcon />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {"כרגע מלמד"}
                  </p>
                </div>

                {loadingCourses.includes(
                  `${course.courseName}${course.courseDepartment}`
                ) && <LoadingSpinner className={""} />}

                <Switch
                  style={{ direction: "ltr" }}
                  checked={course.courseActive}
                  onCheckedChange={() =>
                    mutate({
                      courseName: course.courseName,
                      courseDepartment: course.courseDepartment,
                      newStatus: !course.courseActive,
                    })
                  }
                  disabled={loadingCourses.includes(
                    `${course.courseName}${course.courseDepartment}`
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default DisplayCourses;
