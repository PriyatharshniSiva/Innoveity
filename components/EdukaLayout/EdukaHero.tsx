"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface EdukaHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  showBrochure?: boolean;
}

export default function EdukaHero({
  title,
  subtitle,
  description,
  primaryButtonText = "Contact Us",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "#features",
  backgroundImage = "/inv1.jpg",
  showBrochure = true
}: EdukaHeroProps) {
  // Mouse Parallax Effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(showBrochure);

  useEffect(() => {
    setIsBrochureOpen(showBrochure);
  }, [showBrochure]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20; // max 20px movement
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white text-secondary pt-[50px] pb-16 lg:pb-24 min-h-screen flex flex-col justify-center">
      
      {/* Soft Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base light green glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Soft sunrise orange accent */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[150px] opacity-20" />
        {/* Subtle primary green glow in center */}
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[40%] bg-primary rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Floating Abstract Shapes */}
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[45%] z-0 pointer-events-none opacity-30"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="24" height="24" transform="rotate(45 24 24)" stroke="var(--color-accent)" strokeWidth="3" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid grid-cols-1 ${isBrochureOpen ? 'lg:grid-cols-[1.2fr_auto_1.1fr]' : 'lg:grid-cols-2'} gap-8 xl:gap-12 items-center transition-all duration-500`}>
          
          {/* Left Column: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left space-y-6 lg:pr-8"
          >
            {subtitle && (
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-extrabold text-xs tracking-[0.2em] uppercase border border-primary/20 shadow-sm"
              >
                {subtitle}
              </motion.span>
            )}
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-secondary leading-[1.1] tracking-tight"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl font-medium leading-relaxed"
            >
              {description}
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
            >
              {primaryButtonText && primaryButtonLink && (
                <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                  <Link href={primaryButtonLink} className="w-full sm:w-auto">
                    <motion.button 
                      whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(24, 93, 70, 0.35), 0 10px 10px -5px rgba(24, 93, 70, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 overflow-hidden flex items-center justify-center cursor-pointer"
                    >
                      <span className="relative z-10">{primaryButtonText}</span>
                      <svg className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </motion.button>
                  </Link>
                </motion.div>
              )}
              
              {secondaryButtonText && secondaryButtonLink && (
                <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                  <Link href={secondaryButtonLink} className="w-full sm:w-auto">
                    <motion.button 
                      whileHover={{ y: -4, scale: 1.02, backgroundColor: "rgba(24, 93, 70, 0.08)", borderColor: "rgba(24, 93, 70, 0.8)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full sm:w-auto px-8 py-4 bg-white text-primary border-2 border-primary/20 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                    >
                      {secondaryButtonText}
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Middle Column: Brochure and Apply Button */}
          {isBrochureOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, width: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.2 }}
              className="flex flex-col items-center justify-center w-full max-w-[320px] mx-auto z-20"
            >
              <div className="bg-white p-3 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 w-full relative group">
                <button 
                  onClick={() => setIsBrochureOpen(false)}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0f172a] hover:bg-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-30"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="rounded-xl overflow-hidden mb-3 border border-gray-100 relative">
                  <img 
                    src="/brochure.jpg" 
                    alt="Internship Call Brochure" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <a href="https://forms.gle/G9tFYtJ53W9873wQ6" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <button className="w-full bg-[#1a3a78] hover:bg-[#112754] text-white font-bold text-base py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md">
                    Apply Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </button>
                </a>
              </div>
            </motion.div>
          )}

          {/* Right Column: Hero Illustration with Parallax and Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative lg:h-[600px] flex items-center justify-center w-full"
          >
            {/* Glowing Backdrop for Illustration */}
            <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Parallax Container */}
            <motion.div
              style={{
                x: mousePosition.x * -1,
                y: mousePosition.y * -1,
              }}
              className="relative z-10 w-full max-w-lg mx-auto"
            >
              {/* Floating Animation */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50 bg-white/20 backdrop-blur-md p-2"
              >
                <div className="rounded-2xl overflow-hidden relative aspect-[4/3] bg-gray-100">
                  <img 
                    src={backgroundImage} 
                    alt="Hero Illustration" 
                    className="w-full h-full object-cover scale-105"
                  />
                  {/* Subtle Glassmorphic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-60 mix-blend-multiply" />
                </div>
                
                {/* Floating Stats Badge inside the glass container */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  className="absolute bottom-4 -left-4 bg-white/90 backdrop-blur-xl border border-white p-3 rounded-2xl shadow-xl flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Placement Rate</p>
                    <p className="text-xl font-black text-secondary">85%<span className="text-primary text-base">+</span></p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Brochure Shortcut */}
      {!isBrochureOpen && showBrochure && (
        <motion.button
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => setIsBrochureOpen(true)}
          className="fixed right-0 top-1/3 z-50 bg-primary text-white p-3 rounded-l-xl shadow-lg shadow-primary/40 hover:brightness-110 transition-all duration-300 flex flex-col items-center gap-3 border-2 border-r-0 border-white/20 group hover:-translate-x-2"
        >
          <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <span className="text-sm font-bold tracking-widest rotate-180 pb-2 uppercase" style={{ writingMode: 'vertical-rl' }}>View Programs</span>
        </motion.button>
      )}

    </section>
  );
}
