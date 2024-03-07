import { ModeToggle } from "@/components/ModeToggle";
import { H2 } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "auth";
import Link from "next/link";
import React from "react";

async function AppBar() {
  const session = await auth();
  return (
    <div className="py-4 border-b pb-2 mb-4">
      <>
        {session && session.user ? (
          <div className="flex flex-row justify-between mx-4">
            <H2>
              <Badge className="ml-2">{session.user.role}</Badge>
              {session.user.name}
            </H2>
            <div className="flex gap-2">
              <form
                action={async () => {
                  "use server";
                  await signOut();
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
