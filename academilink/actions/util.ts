"use server";
import { prisma } from "@/utils/connect";
import { auth } from "@/utils/auth";

export const getSessionCheckRole = async (role: string) => {
  const session = await auth();
  if (!session || !session.user.id) {
    throw new Error("User not found");
  }

  if (session.user.role !== role) {
    throw new Error("You don't have permissions for " + role);
  }
  return session;
};

export type ResolvedReturnType<T> = T extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : any;
