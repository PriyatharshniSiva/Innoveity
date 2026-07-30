"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SessionGuard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // If there is no session flag in sessionStorage (e.g. new tab or closed tab)
      if (!sessionStorage.getItem('adminSession')) {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
          localStorage.removeItem("adminEmail");
          localStorage.removeItem("adminName");
          router.push("/admin/login");
        } catch (error) {
          console.error("Logout failed", error);
        }
      } else {
        setIsChecking(false);
      }
    };
    checkSession();
  }, [router]);

  if (isChecking) {
    // Optionally return a loading state or nothing while checking
    return null; 
  }

  return null;
}
