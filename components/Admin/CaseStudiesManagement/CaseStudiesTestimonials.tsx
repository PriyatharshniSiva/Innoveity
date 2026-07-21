"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCaseStudies } from "./CaseStudiesState";

export default function CaseStudiesTestimonials() {
  const { partnerQuotes } = useCaseStudies();

  if (!partnerQuotes || partnerQuotes.length === 0) return null;

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeUpChild = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const } },
  };

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10">
      <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          What Our Partners Say
        </h2>
        <p className="text-slate-500 font-medium">
          Hear from the leaders and innovators we've had the privilege to work with
        </p>
      </div>

      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {partnerQuotes.map((q, idx) => (
          <motion.div
            key={idx}
            variants={fadeUpChild}
            className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:border-slate-200 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="mb-6 opacity-20 text-[#185D46] group-hover:opacity-40 transition-opacity">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
              </svg>
            </div>
            <blockquote className="text-slate-700 text-lg mb-6 leading-relaxed font-semibold relative z-10">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
