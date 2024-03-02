import { auth } from "@/utils/auth";

const UserRole = async () => {
  const session = await auth();

  return (
    <div>
      {session ? (
        <div>
          You are authenticated as {session.user.role} with id {session.user.id}
        </div>
      ) : (
        <div>No Session Found</div>
      )}
    </div>
  );
};

export default UserRole;
