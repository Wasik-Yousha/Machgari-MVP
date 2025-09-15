"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/"
      onClick={(e) => {
        e.preventDefault();
        window.location.reload();
      }}
      className="cursor-pointer inline-block"
    >
      <Image
        src={mounted && theme === "dark" ? "/images/machgai-logo-white.png" : "/images/machgai-logo-black.png"}
        alt="MachGari Logo"
        width={100}
        height={100}
        priority
        className=""
      />
    </Link>
  );
}
