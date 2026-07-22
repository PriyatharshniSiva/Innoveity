"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Testimonial {
  quote: string;
  name: string;
  date: string;
}

interface EdukaTestimonialsProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  testimonials: Testimonial[];
}

export default function EdukaTestimonials({ badge, title, subtitle, testimonials }: EdukaTestimonialsProps) {
  return (
    <section className="pt-[50px] pb-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[var(--color-brand-primary, #0F172A)] tracking-tight">
              {(() => {
                if (typeof title === 'string') {
                  let highlightStr = "";
                  if (title.includes('What Our')) highlightStr = 'What Our';
                  else if (title.includes('Client ')) highlightStr = 'Client ';
                  
                  if (highlightStr) {
                    const parts = title.split(highlightStr);
                    return (
                      <>
                        {parts[0]}
                        <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>{highlightStr}</span>
                        {parts.slice(1).join(highlightStr)}
                      </>
                    );
                  }
                }
                return title;
              })()}
            </h2>
            <p className="text-slate-500 text-lg">
              {subtitle || "Real reviews from our valued partners and clients who have experienced the INNOVEITY difference."}
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 md:p-6 bg-white inline-flex flex-col items-center justify-center flex-shrink-0 shadow-sm w-full md:w-auto">
            <div className="flex space-x-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ))}
            </div>
            <span className="font-bold text-[#0F172A] text-sm">5.0 Based on 5+ Google Reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(24, 93, 70, 0.12)" }}
              className="bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 h-full"
            >
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
              </div>
              
              <p className="text-[#185D46] font-medium leading-relaxed mb-8 flex-grow italic">
                &quot;{review.quote}&quot;
              </p>
              
              <div className="mt-auto flex flex-col items-center">
                <div className="flex items-center justify-center space-x-1.5">
                  <span className="font-bold text-black">{review.name}</span>
                  <svg className="w-4 h-4 text-[#185D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="flex items-center text-slate-600 text-sm mt-1 space-x-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  <span>{review.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center space-y-8 flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl text-[#185D46]">
            Experience the INNOVEITY difference yourself
          </h3>
          <Link href="/contact">
            <motion.button 
              whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(24, 93, 70, 0.3), 0 10px 10px -5px rgba(24, 93, 70, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#185D46] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#124836] transition-all duration-300 shadow-sm cursor-pointer"
            >
              Get Started Today
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
