import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContactWidget from "@/components/FloatingContactWidget";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-white pt-[120px] antialiased overflow-x-hidden`}
      >
        <Navbar />
        <SmoothScroll />
        <main className="relative">{children}</main>
        <FloatingContactWidget />
      </body>
    </html>
  );
}
