"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface EdukaHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage: string;
}

export default function EdukaHero({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage
}: EdukaHeroProps) {
  // Mouse Parallax Effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    <section className="relative w-full overflow-hidden bg-white text-[#0F172A] pt-[50px] pb-16 lg:pb-24">
      
      {/* Soft Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base light green glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#185D4620] rounded-full blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Soft sunrise orange accent */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F59E0B] rounded-full blur-[150px] opacity-20" />
        {/* Subtle primary green glow in center */}
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[40%] bg-[#185D46] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '10s' }} />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
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
                className="inline-block px-4 py-1.5 rounded-full bg-[#185D4620] text-[#185D46] font-extrabold text-xs tracking-[0.2em] uppercase border border-primary/20 shadow-sm"
              >
                {subtitle}
              </motion.span>
            )}
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0F172A] leading-[1.1] tracking-tight"
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
              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Link href={primaryButtonLink} className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(24, 93, 70, 0.35), 0 10px 10px -5px rgba(24, 93, 70, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#185D46] to-[#185D46] text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    <span className="relative z-10">{primaryButtonText}</span>
                    <svg className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </motion.button>
                </Link>
              </motion.div>
              
              {secondaryButtonText && secondaryButtonLink && (
                <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                  <Link href={secondaryButtonLink} className="w-full sm:w-auto">
                    <motion.button 
                      whileHover={{ y: -4, scale: 1.02, backgroundColor: "rgba(24, 93, 70, 0.08)", borderColor: "rgba(24, 93, 70, 0.8)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full sm:w-auto px-8 py-4 bg-white text-[#185D46] border-2 border-primary/20 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                    >
                      {secondaryButtonText}
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

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
                x: mousePosition.x * -1, // Reverse direction for natural parallax
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
                  className="absolute bottom-4 -left-6 bg-white/90 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#185D4620] flex items-center justify-center text-[#185D46]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Placement Rate</p>
                    <p className="text-2xl font-black text-[#0F172A]">85%<span className="text-[#185D46] text-lg">+</span></p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
