import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Login | INNOVEITY",
  description: "Secure login for the INNOVEITY admin portal",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F4F7F6] text-slate-800 min-h-screen selection:bg-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
