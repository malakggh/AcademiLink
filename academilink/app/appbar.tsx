import { ModeToggle } from "@/components/ModeToggle";
import { H2 } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { auth, signIn, signOut } from "auth";
import ActiveLink from "@/components/ActiveLink"; // Import the new client-side component

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
    <div className="py-4 border-b pb-2 mb-4">
      <>
        {session && session.user ? (
          <div className="flex flex-wrap justify-between mx-4">
            <H2>
              {session.user.name}
              <Badge className="mr-2">{session.user.role}</Badge>
            </H2>

            <NavigationMenu>
              <NavigationMenuList
                style={{
                  display: "flex",
                  flexDirection: "row",
                  direction: "rtl",
                }}
              >
                {navigation[session.user.role].map((item, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ActiveLink href={item.href} label={item.label} />{" "}
                    {/* Use ActiveLink */}
                    {navigation[session.user.role].length !== i + 1 && (
                      <MenubarSeparator
                        style={{ marginLeft: "8px", marginRight: "8px" }}
                      />
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex gap-2">
              <form
                action={async () => {
                  "use server";
                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <Button type="submit">{"להתנתק"}</Button>
              </form>
              <ModeToggle />
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between mx-4">
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <Button type="submit">{"להתחבר"}</Button>
            </form>
            <ModeToggle />
          </div>
        )}
      </>
    </div>
  );
}

export default AppBar;
