"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface SplitTestimonialProps {
  title: string;
  testimonials: Testimonial[];
}

export default function SplitTestimonial({ title, testimonials }: SplitTestimonialProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        {/* Left Side: Large Image with Vertical Text */}
        <div className="w-full lg:w-[45%] relative">
          <div className="relative z-10 w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={testimonials[activeIdx].image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
                alt="Testimonial author"
              />
            </AnimatePresence>
          </div>
          
          {/* Vertical Feedback Text */}
          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span className="text-gray-200 text-6xl font-extrabold tracking-widest uppercase opacity-40 select-none">
              Feedback
            </span>
          </div>
          
          {/* Decorative quotes */}
          <div className="absolute -top-6 -left-6 text-8xl text-[#f59e0b] opacity-30 select-none font-serif leading-none">
            &quot;
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-[55%] space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>

          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#f59e0b] fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <div className="min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed italic">
                  &quot;{testimonials[activeIdx].quote}&quot;
                </p>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonials[activeIdx].name}</h4>
                  <p className="text-gray-500 text-sm">{testimonials[activeIdx].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Avatar Selectors */}
          <div className="pt-8 border-t border-gray-100 flex gap-4">
            {testimonials.map((t, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 ${activeIdx === idx ? 'ring-2 ring-[#185D46] ring-offset-2 scale-110' : 'opacity-50 hover:opacity-100'}`}
              >
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
