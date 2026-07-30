import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminTopbar from "@/components/Admin/AdminTopbar";
import { AdminThemeProvider } from "@/components/Admin/AdminThemeProvider";
import { ToastProvider } from "@/components/Admin/Toast";
import SessionGuard from "@/components/Admin/SessionGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard | INNOVEITY",
  description: "Enterprise Admin Dashboard",
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let themeData = null;
  try {
    const data = await prisma.themeSettings.findUnique({ where: { id: 1 } });
    if (data) {
      themeData = JSON.parse(data.contentJson);
    }
  } catch (error) {
    console.error("Failed to load theme settings:", error);
  }

  return (
    <html lang="en">
      <head>
        {themeData?.colors && (
          <style dangerouslySetInnerHTML={{
            __html: `
              :root {
                --color-brand-primary: ${themeData.colors.primary};
                --color-brand-secondary: ${themeData.colors.secondary};
                --color-brand-accent: ${themeData.colors.accent};
                --color-success: ${themeData.colors.success};
                --color-warning: ${themeData.colors.warning};
                --background: ${themeData.colors.background};
                --foreground: ${themeData.colors.foreground};
              }
            `
          }} />
        )}
      </head>
      <body className={`${inter.className} bg-[#F4F7F6] dark:bg-[#0a0a0a] text-slate-800 dark:text-neutral-200 min-h-screen flex selection:bg-primary selection:text-white dark:selection:bg-white dark:selection:text-black overflow-hidden transition-colors duration-300`}>
        <AdminThemeProvider>
          <ToastProvider>
            <SessionGuard />
            {/* Left Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
              {/* Topbar */}
              <AdminTopbar />

              {/* Page Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#F4F7F6] dark:bg-[#0a0a0a] transition-colors duration-300">
                <div className="p-8 pb-24 max-w-[1600px] mx-auto w-full">
                  {children}
                </div>
              </div>
            </main>
          </ToastProvider>
        </AdminThemeProvider>
      </body>
    </html>
  );
}
