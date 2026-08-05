import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Login | INNOVEITY",
  description: "Secure login for the INNOVEITY admin portal",
};

import { prisma } from "@/lib/prisma";


export const revalidate = 0;

export default async function AuthLayout({
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
      <body className={`${inter.className} bg-[#F4F7F6] text-slate-800 min-h-screen selection:bg-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
