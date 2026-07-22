import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INNOVEITY - Corporate Training & College Development Chennai Tamil Nadu",
  description:
    "Leading corporate training provider in Tamil Nadu. 2000+ students trained annually, 85% placement improvement. Faculty development, L&D solutions, ESG consulting across Chennai, Coimbatore, Madurai.",
  keywords:
    "corporate training Chennai, faculty development Tamil Nadu, placement training Coimbatore, L&D solutions, ESG consulting, college training partner, skill development",
};

export default async function RootLayout({
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
    <html lang="en" className="scroll-smooth">
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
      <body
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen pt-16 antialiased overflow-x-hidden`}
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)'
        }}
      >
        <Navbar />
        <SmoothScroll />
        <main className="relative">{children}</main>
        <FloatingContactWidget initialOptions={themeData?.floatingContactWidget} />
      </body>
    </html>
  );
}
