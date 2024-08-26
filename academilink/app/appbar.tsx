import { ModeToggle } from "@/components/ModeToggle";
import { H2 } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenubarSeparator } from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { auth, signIn, signOut } from "auth";
import ActiveLink from "@/components/ActiveLink";
import Image from "next/image";
import Link from "next/link";

async function AppBar() {
  const session = await auth();
  const navigation = {
    STUDENT: [
      { href: "/student/session/requests", label: "הצג בקשות" },
      { href: "/student/session/search", label: "בקש תיגבור" },
    ],
    TUTOR: [
      { href: "/tutor/preferences", label: "העדפות שלי" },
      { href: "/tutor/courses", label: "הקורסים שלי" },
      { href: "/tutor/sessions", label: "התגבורים שלי" },
      { href: "/tutor/report", label: "דוח חודשי שלי" },
    ],
    MANAGER: [
      { href: "/manager/courses/requests", label: "בקשות מתגברים" },
      { href: "/manager/stats", label: "סטטיסטיקות" },
      { href: "/manager/tutors/report", label: "דוח חודשי של המתגברים" },
    ],
  };

  return (
    <div className="pt-4 border-b pb-2 mb-1">
      <>
        {session && session.user ? (
          <div className="flex justify-between items-center mx-4">
            <H2 className="flex flex-col items-start justify-center">
              {session.user.name}
              <Badge>{session.user.role}</Badge>
            </H2>

            <NavigationMenu>
              <NavigationMenuList className="flex items-center rtl">
                {navigation[session.user.role].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <ActiveLink href={item.href} label={item.label} />
                    {navigation[session.user.role].length !== i + 1 && (
                      <MenubarSeparator className="mx-2" />
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex gap-2 items-center">
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit">{"להתנתק"}</Button>
              </form>
              <ModeToggle />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mx-4">
            {/* <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <Button type="submit">{"להתחבר"}</Button>
            </form> */}
            {/* <Link href="/loginbox" passHref>
              <Button asChild>{"להתחבר"}</Button>
            </Link> */}
            <Link href="/loginbox" passHref>
              <Button>{"להתחבר"}</Button>
            </Link>
            <div className="flex">
              <H2 className="flex flex-col items-start justify-center">
                AcademiLink
              </H2>
              {/* <Image
                src="/images/AcademiLink.png"
                alt="AcademiLink"
                width={150}
                height={150}
                quality={100}
              /> */}
            </div>
            <ModeToggle />
          </div>
        )}
      </>
    </div>
  );
}

export default AppBar;
