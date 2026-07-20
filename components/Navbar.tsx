"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus_Jakarta_Sans } from 'next/font/google';
import { motion, useScroll } from 'framer-motion';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['700', '800'] });

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Force light theme for the new layout
    document.documentElement.classList.add("light");
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Knowledge Hub", href: "/knowledge-hub" },
    { name: "Courses", href: "/events" },
    { name: "CSR", href: "/csr" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 transition-all duration-300"
    >

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-gray-100 shadow-sm" 
          : "bg-transparent border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 sm:gap-2 pl-2">
              <div className="h-[60px] sm:h-[70px] flex items-center justify-center shrink-0">
                 <img src="/iinvlogo.png" alt="Logo Icon" className="w-auto h-full object-contain scale-[1.5]" />
              </div>
              <div className="h-[60px] sm:h-[70px] flex items-center justify-center shrink-0">
                 <img src="/innvlog2.png" alt="INNOVEITY Text" className="w-auto h-full object-contain scale-[1.5] origin-left" />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-semibold text-base transition-colors flex items-center relative py-1.5 group ${
                      isActive ? "text-[#f59e0b]" : "text-gray-700 hover:text-[#f59e0b]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#f59e0b] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : ''}`} />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-[#185D46] p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 z-40">
            <div className="flex flex-col space-y-2 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-gray-700 font-bold hover:text-[#f59e0b] border-b border-gray-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Scroll indicator bar */}
      <motion.div style={{ scaleX: scrollYProgress }} className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#185D46] origin-left z-50" />
    </motion.div>
  );
}
