import { Button } from "@/components/ui/button";
import { prisma } from "@/utils/connect";

const page = () => {
  async function createTutorCourse() {
    try {
    } catch (error: any) {
      throw new Error(`Operation failed: ${error.message}`);
    }
  }
  return (
    <div>
      <Button size="lg" onClick={createTutorCourse}>
        Create Tutor Course
      </Button>
    </div>
  );
};

export default page;
