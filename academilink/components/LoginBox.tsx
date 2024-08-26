import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { signIn, auth } from "auth";
import { redirect } from "next/navigation";

export default async function LoginBox() {
  // redirect to the user's role-specific page if they are already logged in
  const session = await auth();
  if (session) {
    const role = session && session.user.role; // Replace with actual role-check logic
    const navigation = {
      STUDENT: "/student/session/requests",
      TUTOR: "/tutor/preferences",
      MANAGER: "/manager/courses/requests",
    };
    const redirectUrl = role && navigation[role];
    redirect(redirectUrl);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-[rgba(0,0,0,0.2)]">
      <div className="relative w-[450px] p-[7.5em_2.5em_4em] backdrop-blur-[25px] border-2 border-primary rounded-[15px] shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] text-primary-foreground">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-primary w-[140px] h-[70px] rounded-b-[20px]">
          <span className="text-[30px] text-primary-foreground">התחברות</span>
        </div>
        <div>
          <div className="relative flex flex-col my-5">
            <input
              type="text"
              id="user"
              required
              className="w-full h-[55px] text-[16px] bg-transparent text-primary-foreground px-[20px_50px] border-2 border-primary rounded-[30px] outline-none"
            />
            <label
              htmlFor="user"
              className="absolute top-[15px] left-[20px] transition"
            >
              שם משתמש
            </label>
            <i className="bx bx-user absolute top-[18px] right-[25px] text-[20px]"></i>
          </div>
          <div className="relative flex flex-col my-5">
            <input
              type="password"
              id="pass"
              required
              className="w-full h-[55px] text-[16px] bg-transparent text-primary-foreground px-[20px_50px] border-2 border-primary rounded-[30px] outline-none"
            />
            <label
              htmlFor="pass"
              className="absolute top-[15px] left-[20px] transition"
            >
              סיסמה
            </label>
            <i className="bx bx-lock-alt absolute top-[18px] right-[25px] text-[20px]"></i>
          </div>
          <div className="flex justify-between text-[15px]">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">תזכור אותי</label>
          </div>
          <div className="my-5">
            <Button
              type="submit"
              variant="secondary"
              className="w-full h-[50px] font-medium rounded-[30px] cursor-pointer transition hover:bg-accent"
            >
              התחבר
            </Button>
          </div>
          {/* Google Sign-In Button */}
          <div className="my-5">
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <Button
                type="submit"
                className="w-full h-[50px] font-medium rounded-[30px] cursor-pointer transition hover:bg-accent-foreground"
              >
                התחבר עם גוגל
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
