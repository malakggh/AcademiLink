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

export const getCurrentSesmesterId = async () => {
  try {
    // find the current semester by max start date
    const currentSemester = await prisma.semesterInSCE.findFirst({
      orderBy: { startingDate: "desc" },
    });
    if (!currentSemester) {
      throw new Error("Semester not found");
    }
    return currentSemester.id;
  } catch (error: any) {
    throw new Error(`Operation failed: ${error.message}`);
  }
};

import * as fs from "fs";
import * as path from "path";

// Function to append logs to a file
export const logMessage = (name: string, message: string): void => {
  const logDir = path.join(__dirname, "log");
  const filePath = path.join(logDir, `${name}.txt`);

  // Ensure the log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Append the message to the file, creating the file if it doesn't exist
  const logEntry = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(filePath, logEntry, "utf8");
};
