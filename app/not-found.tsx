"use client";

import Link from "next/link";
import { Montserrat, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import "./globals.css";

const montserrat = Montserrat({ subsets: ['latin'], weight: ['800', '900'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`antialiased font-sans ${inter.variable}`}>
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-2xl w-full text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-8">
                <Link href="/" className="flex items-center gap-1 sm:gap-2">
                  <div className="h-[52px] flex items-center justify-center shrink-0">
                     <img src="/iinvlogo.png" alt="Logo Icon" className="w-auto h-full object-contain scale-[1.5]" />
                  </div>
                  <div className="h-[52px] flex items-center justify-center shrink-0">
                     <img src="/innvlog2.png" alt="INNOVEITY Text" className="w-auto h-full object-contain scale-[1.5] origin-left" />
                  </div>
                </Link>
              </div>
              
              <h1 className={`text-7xl md:text-9xl font-black text-primary tracking-tighter ${montserrat.className}`}>
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 tracking-tight">
                Oops! Page Not Found
              </h2>
              
              <p className="text-gray-600 text-lg md:text-xl mt-4 max-w-lg mx-auto leading-relaxed">
                We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-bold text-[15px] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    Back to Home
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="w-full sm:w-auto bg-white border-2 border-primary text-primary hover:bg-[#f0f9f4] px-8 py-3.5 rounded-full font-bold text-[15px] shadow-sm transition-all duration-300 flex items-center justify-center">
                    Contact Support
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}
