"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface ActiveLinkProps {
  href: string;
  label: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`relative inline-block ${
        pathname === href ? "text-primary" : ""
      } text-sm transition-colors hover:text-primary`}
    >
      {label}
      {pathname === href && (
        <span className="absolute left-0 bottom-[-10px] h-[3px] w-full bg-primary transition-all duration-500 ease-in-out" />
      )}
    </Link>
  );
};

export default ActiveLink;
