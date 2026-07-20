"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

interface SplitFaqProps {
  title: string;
  subtitle?: string;
  faqs: FaqItem[];
  images: string[];
}

export default function SplitFaq({ title, subtitle, faqs, images }: SplitFaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left side: Abstract Collage */}
        <div className="w-full lg:w-1/2 relative h-[400px]">
          <div className="absolute top-0 left-0 w-48 h-48 rounded-[30px] overflow-hidden shadow-lg">
            <img src={images[0] || "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"} className="w-full h-full object-cover" alt="FAQ 1" />
          </div>
          <div className="absolute top-8 right-12 w-32 h-32 bg-[#185D46] rounded-[30px] flex items-center justify-center shadow-lg transform rotate-6">
            <div className="text-center text-white">
              <span className="text-3xl font-bold block">18+</span>
              <span className="text-xs">Years Exp.</span>
            </div>
          </div>
          <div className="absolute bottom-12 left-12 w-28 h-28 bg-[#f59e0b] rounded-[30px] flex items-center justify-center shadow-lg transform -rotate-3">
            <div className="text-center text-white">
              <span className="text-2xl font-bold block">4+</span>
              <span className="text-xs">Awards</span>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-56 h-40 rounded-[30px] overflow-hidden shadow-lg">
            <img src={images[1] || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"} className="w-full h-full object-cover" alt="FAQ 2" />
          </div>
          {/* Connecting dashed line SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 400 400">
            <path d="M100 100 Q 250 50 300 200 T 200 350" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        {/* Right side: Accordion */}
        <div className="w-full lg:w-1/2 space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50 shadow-sm">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className={`font-bold pr-4 ${openIdx === idx ? 'text-[#185D46]' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIdx === idx ? 'bg-[#185D46] text-white' : 'bg-white text-gray-400 border border-gray-200'}`}>
                  {openIdx === idx ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
