"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoLogout() {
  const router = useRouter();

  useEffect(() => {
    // If we land on a public page, destroy the admin session
    const destroySession = async () => {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
        router.refresh();
      } catch (error) {
        console.error("Auto logout failed", error);
      }
    };

    destroySession();
  }, [router]);

  return null;
}
