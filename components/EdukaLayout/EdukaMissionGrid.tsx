"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function EdukaMissionGrid() {
  const foundationCards = [
    {
      title: "Our Mission",
      description: "To bridge the gap between education and industry through innovative solutions and sustainable practices.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "Our Vision",
      description: "To become the global gold standard for educational integration, where the boundary between classroom and career ceases to exist.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Our Values",
      description: "Innovation, Integrity, Excellence, Sustainability, and Collaborative Growth.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Premium background decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl sm:text-5xl font-extrabold text-[var(--color-brand-primary, #0F172A)] tracking-tight"
          >
            <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Our </span>Foundation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
          >
            The core principles that guide everything we do
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foundationCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 100 }}
              className="bg-[#185D46] rounded-2xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left h-full"
            >
              <div className="text-[#F59E0B] mb-12">
                {card.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
                {card.title}
              </h3>
              
              <p className="text-white/90 leading-relaxed font-medium">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
