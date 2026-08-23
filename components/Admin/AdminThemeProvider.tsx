"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface AdminThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Force light theme initially as requested
    setTheme("light");
    localStorage.setItem("adminTheme", "light");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("adminTheme", newTheme);
  };

  if (!mounted) {
    // Prevent hydration mismatch by rendering invisible initially but still provide context
    return (
      <AdminThemeContext.Provider value={{ theme, toggleTheme: () => {} }}>
        <div className="invisible h-screen w-full flex">{children}</div>
      </AdminThemeContext.Provider>
    );
  }

  return (
    <AdminThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme === 'dark' ? 'dark' : ''} flex-1 min-h-screen w-full flex bg-slate-50 dark:bg-[#0A0E39] text-slate-800 dark:text-white transition-colors duration-300`}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (context === undefined) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider");
  }
  return context;
}
