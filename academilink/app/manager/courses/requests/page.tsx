import ManagerTutorRequests from "@/components/ManagerTutorRequests";
import { auth } from "@/utils/auth";

export default async function Courses() {
  const session = await auth();
  if (!session) {
    throw new Error("User not found");
  }
  if (session.user.role !== "MANAGER") {
    throw new Error("You don't have manager permissions");
  }

  return (
    <>
      <ManagerTutorRequests />
    </>
  );
}
