"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface WavyHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  bgStyle?: React.CSSProperties;
}

export default function WavyHero({ badge, title, subtitle, description, bgStyle }: WavyHeroProps) {
  return (
    <div 
      className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden text-center flex flex-col items-center"
      style={bgStyle || { background: 'linear-gradient(135deg, var(--color-primary), #14b8a6, #0d9488)' }}
    >
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[10%] w-24 h-24 rounded-full border-4 border-white/20 bg-white/10 hidden md:block"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-[15%] w-32 h-32 rounded-full border-4 border-accent/30 bg-accent/20 hidden md:block"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-48 left-[20%] w-16 h-16 rounded-full bg-[#3b82f6]/20 hidden md:block"
      />
      
      {/* Doodle SVGs */}
      <svg className="absolute top-32 left-[25%] w-24 h-24 text-white/30 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
      <svg className="absolute top-24 right-[25%] w-20 h-20 text-white/30 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7"></path>
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {badge && (
          <span className="inline-block bg-white/20 backdrop-blur-md !text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/30 shadow-sm">
            {badge}
          </span>
        )}
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold !text-white tracking-tight leading-tight">
          {title} <span className="!text-[#fde68a]">{subtitle}</span>
        </h1>
        
        {description && (
          <div className="text-lg sm:text-xl !text-teal-50 max-w-3xl mx-auto font-medium leading-relaxed">
            {description}
          </div>
        )}
      </div>

      {/* White wavy shape divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg className="relative block w-full h-[60px] sm:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.71,114.52,125.68,118.82,187.32,106.18Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
}
