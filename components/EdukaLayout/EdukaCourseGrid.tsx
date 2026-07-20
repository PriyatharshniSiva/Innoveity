"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CourseItem {
  image: string;
  category: string;
  title: string;
  description: string;
  meta?: string;
  link: string;
}

interface EdukaCourseGridProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  items: CourseItem[];
}

export default function EdukaCourseGrid({ badge, title, description, items }: EdukaCourseGridProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="text-[#185D46] font-bold tracking-widest text-sm uppercase">{badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-slate-600 text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(24, 93, 70, 0.12)" }}
              className="eduka-card group flex flex-col overflow-hidden bg-white border border-slate-100 hover:border-[#185D46]/30 transition-all duration-300 rounded-2xl"
            >
              {/* Image Header */}
              <div className="relative h-60 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-sm font-bold text-[#185D46]">
                  {item.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                {item.meta && (
                  <div className="flex items-center text-sm text-slate-500 font-medium mb-3">
                    <svg className="w-4 h-4 mr-2 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {item.meta}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 group-hover:text-[#185D46] transition-colors duration-300">
                  <Link href={item.link}>{item.title}</Link>
                </h3>
                
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                  {item.description}
                </p>
                
                {/* Footer Link */}
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <Link href={item.link} className="inline-flex items-center text-[#0F172A] font-bold group-hover:text-[#185D46] transition-colors">
                    Know Details
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
