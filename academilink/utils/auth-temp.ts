import { NextAuthConfig, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./connect";

// declare module "next-auth" {
//   interface Session {
//     user: User & {
//       isAdmin: boolean;
//       id: string;
//     };
//   }
// }
// declare module "@auth/core/jwt" {
//   interface JWT {
//     isAdmin: boolean;
//     id: string;
//   }
// }

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, trigger, session: sessionRequest }) {
      if (
        trigger === "update" &&
        (sessionRequest?.name || sessionRequest?.image)
      ) {
        // Note, that `session` can be any arbitrary object, remember to validate it!

        token.name = sessionRequest.name;

        token.picture = sessionRequest.image;
      }
      if (
        token.email &&
        (!token.id || token.isAdmin === undefined || token.isAdmin === null)
      ) {
        const userInDb = await prisma.user.findUnique({
          where: {
            email: token.email!,
          },
        });
        token.isAdmin = userInDb?.isAdmin!;
        token.id = userInDb?.id!;
      }
      return token;
    },
  },
};

// export const getAuthSession = () => getServerSession(authOptions);
export const getAuthSession = () => auth();
