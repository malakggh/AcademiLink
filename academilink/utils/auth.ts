import "server-only";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./connect";

declare module "@auth/core/jwt" {
  interface JWT {
    role: "STUDENT" | "TUTOR" | "MANAGER";
    id: string;
  }
}

declare module "next-auth" {
  interface User {
    role: "STUDENT" | "TUTOR" | "MANAGER";
  }
  interface Session {
    user: User & {
      role: "STUDENT" | "TUTOR" | "MANAGER";
      id: string;
    };
  }
}

const config = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      // console.log("\nsession", session, "\ntoken", token);
      if (token && token.role) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    jwt({ token, user, trigger, profile, account, session: sessionRequest }) {
      if (user && user.role && user.id) {
        token.role = user.role;
        token.id = user.id;
      }
      // console.log(
      //   "token of jwt",
      //   token
      //   // "\nsession of jwt",
      //   // sessionRequest,
      //   // "\nuser of jwt",
      //   // user,
      //   // "\nprofile of jwt",
      //   // profile,
      //   // "\naccount of jwt",
      //   // account,
      //   // "trigger of jwt",
      //   // trigger
      // );
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
