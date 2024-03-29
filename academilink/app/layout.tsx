import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import AppBar from "./appbar";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StrictMode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AcademiLink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <StrictMode>
        <body className={inter.className}>
          <AuthProvider>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <AppBar />
                {children}
                <Toaster />
              </ThemeProvider>
            </QueryProvider>
          </AuthProvider>
        </body>
      </StrictMode>
    </html>
  );
}
