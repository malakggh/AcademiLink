"use client";
import { SessionProvider } from "next-auth/react";
type Props = { children: React.ReactNode };
const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider refetchInterval={3600} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
};
export default AuthProvider;
