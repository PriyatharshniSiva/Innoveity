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
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("adminTheme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
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
      {/* We apply the `.dark` class to a wrapper div. 
          The @custom-variant dark in globals.css makes it apply to children. */}
      <div className={`${theme === 'dark' ? 'dark' : ''} h-full w-full flex`}>
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
